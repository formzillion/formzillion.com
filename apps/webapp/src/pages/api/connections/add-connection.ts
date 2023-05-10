import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import { get, startCase } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { teamSlug, appSlug, connectionConfig } = req.body;
  const { connectionName, apiKey, webhooksEndpoint } = connectionConfig || {};

  try {
    const supabase = createServerSupabaseClient({ req, res });
    const currentSession = await supabase.auth.getSession();
    const email = get(currentSession, "data.session.user.email", "");

    const user: any = await prisma.users.findFirst({
      where: { email },
      select: {
        id: true,
        teams: { where: { slug: teamSlug }, select: { id: true } },
      },
    });

    const teamId = get(user, "teams.0.id", "");

    const app: any = await prisma.apps.findFirst({
      where: { slug: appSlug, status: "active" },
      select: { slug: true, id: true },
    });

    if (!app) {
      return res
        .status(400)
        .json({ success: false, message: `App not found: ${appSlug}` });
    }

    // Checking if Connection already exists
    const findIfExists = await prisma.connections.findFirst({
      where: {
        appSlug,
        email: email,
        appId: app?.id,
        teamId: teamId,
      },
      select: {
        id: true,
      },
    });
    const connectionData = {
      appSlug,
      email,
      appId: app?.id,
      teamId: teamId,
      name: connectionName || `${startCase(appSlug)} Account`,
      status: "connected",
      apiKeys: {
        ...(apiKey && {
          accessToken: apiKey,
        }),
        ...(webhooksEndpoint && {
          webhooksEndpoint,
        }),
        additionalData: {},
      },
    };

    let createdInfo = {};
    if (findIfExists) {
      createdInfo = await prisma.connections.update({
        where: { id: findIfExists.id },
        data: connectionData,
      });
    } else {
      createdInfo = await prisma.connections.create({
        data: connectionData,
      });
    }

    res.status(201).json({ success: true, data: createdInfo });
  } catch (error: any) {
    console.log("Error in add-connection", error.message);

    return res.status(500).json({ success: false, message: error.message });
  }
}
