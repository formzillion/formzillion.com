import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { appSlug, teamSlug } = req?.body;

  try {
    const connections = await prisma.connections.findMany({
      where: {
        status: "connected",
        team: { slug: teamSlug },
        app: { slug: appSlug },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        name: true,
        teamId: true,
        appSlug: true,
      },
    });

    return res.status(200).json({ success: true, data: connections });
  } catch (error) {
    console.log(`Error from connections list: ${error}`);

    return res.status(500).json({ success: false, error });
  }
}
