import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

import { getAccessToken } from "./slack-sdk";
import callbackHelper from "@/lib/integrationsCallbackHelper";

const appSlug = "slack";

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
    // Getting auth data querying the "code" from Slack
    const accessParams = await getAccessToken(code);

    console.log("Slack callback accessParams: ", accessParams);

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

    console.log("Slack connection requiredData: ", requiredData);

    if (!requiredData.success) {
      return res.status(400).json(requiredData);
    }

    const connectionData: any = {
      name: email,
      email: email,
      appId: requiredData?.appId,
      appSlug: appSlug,
      status: "connected",
      teamId: requiredData?.teamId,
      apiKeys: {
        accessToken: accessParams.access_token || "",
        channel: accessParams?.incoming_webhook?.channel_id || "",
        additionalData: {
          ...accessParams?.incoming_webhook,
        },
      },
    };

    let connection = {};

    if (requiredData.connectionId) {
      connection = await prisma.connections.update({
        where: { id: requiredData.connectionId },
        data: connectionData,
      });
    } else {
      connection = await prisma.connections.create({
        data: connectionData,
      });
    }

    console.log("Slack connection Data: ", connection);

    return res.send("<script>window.close();</script>");
  } catch (error) {
    console.log(`Error in slack-callback: ${error}`);
    return res.status(500).json({ success: false, error: error });
  }
}
