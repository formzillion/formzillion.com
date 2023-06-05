import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { appSlug, teamSlug } = req.body;

  try {
    const connection = await prisma.connections.findFirst({
      where: {
        status: "connected",
        team: { slug: teamSlug },
        app: { slug: appSlug },
      },
    });

    return res.status(200).json({ success: true, data: connection });
  } catch (error) {
    console.log(`Error from get-connections: ${error}`);

    return res.status(500).json({ success: false, error });
  }
}
