import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

import { getAccessToken } from "./mailchimp-sdk";
import callbackHelper from "@/lib/integrationsCallbackHelper";

const appSlug = "mailchimp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (isEmpty(req.query)) {
      return res.status(400).json({
        success: false,
        message: "Bad request missing required params",
      });
    }

    const { state, code }: any = req.query || {};
    const stateParams = JSON.parse(state || "") as {
      email: string;
      teamSlug: string;
    };

    if (!state || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Missing state or code params" });
    }

    const accessParams = await getAccessToken(code);
    if (isEmpty(accessParams)) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch access token! please try to reconnect",
      });
    }

    const { email, teamSlug } = stateParams;

    const requiredData: any = await callbackHelper({
      email,
      teamSlug,
      appSlug,
    });

    if (!requiredData.success) {
      return res.status(400).json(requiredData);
    }

    const connectionData: any = {
      name: accessParams.accountname || email,
      email: email,
      appId: requiredData?.appId,
      appSlug: appSlug,
      status: "connected",
      teamId: requiredData?.teamId,
      apiKeys: {
        accessToken: accessParams.access_token || "",
        apiEndpoint: accessParams?.api_endpoint || "",
        dc: accessParams?.dc || "",
        additionalData: {
          ...accessParams,
        },
      },
    };

    if (requiredData.connectionId) {
      await prisma.connections.update({
        where: { id: requiredData.connectionId },
        data: connectionData,
      });
    } else {
      await prisma.connections.create({
        data: connectionData,
      });
    }

    return res.send("<script>window.close();</script>");
  } catch (error) {
    console.log(`Error in mailchimp-callback: ${error}`);
    return res.status(500).json({ success: false, error: error });
  }
}
