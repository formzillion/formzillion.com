import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { teamSlug, slug } = JSON.parse(req.body);

  try {
    const findConn = await prisma.connections.findFirst({
      where: {
        appSlug: slug,
        team: {
          slug: teamSlug,
        },
      },
      select: {
        id: true,
      },
    });

    if (!isEmpty(findConn)) {
      await prisma.connections.delete({
        where: {
          id: findConn.id,
        },
      });
    }

    res.status(201).json({ success: true, data: "Disconnected" });
  } catch (error: any) {
    console.log("Error in connection disconnection", error.message);

    return res.status(500).json({ success: false, message: error.message });
  }
}
