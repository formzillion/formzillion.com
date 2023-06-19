import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
import crypto from "crypto";
import qs from "querystring";

import prisma from "@/lib/prisma";
import callBackHelper from "@/lib/integrationsCallbackHelper";

const appSlug = "airtable";
const baseUri = "https://www.airtable.com";
const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/airtable/auth`;
const clientId = process.env.NEXT_PUBLIC_AIRTABLE_CLIENT_ID || "";
const clientSecret = process.env.NEXT_PUBLIC_AIRTABLE_CLIENT_SECRET_ID || "";
const scopes =
  "data.records:read data.records:write schema.bases:read schema.bases:write";

const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
);
const authorizationHeader = `Basic ${encodedCredentials}`;

const authorizationCache: any = {};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const state = JSON.stringify(req.body);
      const codeVerifier = crypto.randomBytes(96).toString("base64url"); // 128 characters
      const codeChallenge = crypto
        .createHash("sha256")
        .update(codeVerifier) // hash the code verifier with the sha256 algorithm
        .digest("base64") // base64 encode, needs to be transformed to base64url
        .replace(/=/g, "") // remove =
        .replace(/\+/g, "-") // replace + with -
        .replace(/\//g, "_"); // replace / with _ now base64url encoded

      authorizationCache[state] = codeVerifier;

      const authUrlIntance = new URL(`${baseUri}/oauth2/v1/authorize`);
      authUrlIntance.searchParams.set("code_challenge", codeChallenge);
      authUrlIntance.searchParams.set("code_challenge_method", "S256");
      authUrlIntance.searchParams.set("state", state);
      authUrlIntance.searchParams.set("client_id", clientId);
      authUrlIntance.searchParams.set("redirect_uri", redirectUri);
      authUrlIntance.searchParams.set("response_type", "code");
      authUrlIntance.searchParams.set("scope", scopes);

      return res.send({ authUrl: authUrlIntance.toString() });
    } else {
      if (isEmpty(req.query)) {
        return res.status(400).json({
          success: false,
          message: "Bad request missing required params",
        });
      }

      const { state, code, error: queryError }: any = req.query || {};
      const codeVerifier = authorizationCache[state];

      if (codeVerifier === undefined) {
        return res.send("This request was not from Airtable!");
      }
      delete authorizationCache[state];

      if (queryError) {
        return res.send(`
            There was an error authorizing this request.
            <br/>Error: "${req.query.error}"
            <br/>Error Description: "${req.query.error_description}"
        `);
      }

      const stateParams = JSON.parse(state) as {
        email: string;
        teamSlug: string;
      };

      if (!state || !code) {
        return res
          .status(400)
          .json({ success: false, message: "Missing state or code params" });
      }
      const accessParams = await getAccessToken(code, codeVerifier);

      if (isEmpty(accessParams)) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch access token! please try to reconnect",
        });
      }

      const { email, teamSlug } = stateParams;

      const requiredData: any = await callBackHelper({
        email,
        teamSlug,
        appSlug,
      });

      if (!requiredData.success) {
        return res.status(500).json(requiredData);
      }

      const connectionData: any = {
        name: accessParams.accountname || email,
        email: email,
        appId: requiredData?.appId,
        appSlug: appSlug,
        teamId: requiredData?.teamId,
        status: "connected",
        apiKeys: {
          accessToken: accessParams.access_token || "",
          refreshToken: accessParams.refresh_token || "",
          additionalData: {
            ...accessParams,
          },
        },
      };

      if (!isEmpty(requiredData.connectionId)) {
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
    }
  } catch (error: any) {
    // TODO: Remove this console after debugging
    console.log("Error from airable/auth : ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getAccessToken = async (code: string, codeVerifier: any) => {
  try {
    const response = await fetch(`${baseUri}/oauth2/v1/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationHeader,
      },
      body: qs.stringify({
        client_id: clientId,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri,
        code: code,
        grant_type: "authorization_code",
      }),
      redirect: "follow",
    });
    const result = await response.json();
    return result || {};
  } catch (error) {
    return {};
  }
};
