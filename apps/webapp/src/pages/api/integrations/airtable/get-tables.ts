import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { get, isEmpty } from "lodash";
import qs from "querystring";

const clientId = process.env.NEXT_PUBLIC_AIRTABLE_CLIENT_ID || "";
const clientSecret = process.env.NEXT_PUBLIC_AIRTABLE_CLIENT_SECRET_ID || "";

const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { connectionId, teamSlug } = req.body;

      const whereQuery = !isEmpty(connectionId)
        ? { id: parseInt(connectionId) }
        : { team: { slug: teamSlug }, appSlug: "airtable" };

      const connection = (await prisma.connections.findFirst({
        where: whereQuery,
        select: {
          apiKeys: true,
          id: true,
        },
      })) as any;

      let accessToken = connection?.apiKeys?.accessToken;
      const getAirtableBase = await fetch(
        `https://api.airtable.com/v0/meta/bases`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const bases = await getAirtableBase.json();
      const errorType = get(bases, "error.type", "");

      if (errorType === "UNAUTHORIZED") {
        accessToken = await getAccessToken(
          connection.apiKeys.refreshToken,
          connectionId || connection.id
        );
      }

      const baseId = get(bases, "bases.0.id", "");
      const getTables = await fetch(
        `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const tablesResp = await getTables.json();
      const tables = tablesResp?.tables?.map((table: any) => ({
        label: table.name,
        value: table.id,
        baseId,
      }));

      return res.status(200).json({ success: true, data: tables });
    }
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: JSON.stringify(error, null, 2) });
  }
}

const getAccessToken = async (refreshToken: string, connectionId: string) => {
  try {
    const getTokens = await fetch(`https://www.airtable.com/oauth2/v1/token`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: qs.stringify({
        client_id: process.env.NEXT_PUBLIC_AIRTABLE_CLIENT_ID || "",
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      redirect: "follow",
    });

    const tokenResp = await getTokens.json();

    if (!tokenResp?.access_token) {
      return "";
    }

    await prisma.connections.update({
      where: {
        id: parseInt(connectionId),
      },
      data: {
        apiKeys: {
          accessToken: tokenResp?.access_token,
          refreshToken: tokenResp?.refresh_token,
          additionalData: tokenResp,
        },
      },
    });

    return tokenResp?.access_token;
  } catch (error) {
    console.log("Error from airtable/get-tables", error);
    return "";
  }
};
