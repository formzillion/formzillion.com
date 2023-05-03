import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { appId, teamSlug } = req.body;

  try {
    const connections = await prisma.connections.findMany({
      where: { status: "connected", appId, team: { slug: teamSlug } },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        name: true,
        teamId: true,
      },
    });
    return res.status(200).json({ success: true, data: connections });
  } catch (error) {
    console.log(`Error from connections list: ${error}`);

    return res.status(500).json({ success: false, error });
  }
}
