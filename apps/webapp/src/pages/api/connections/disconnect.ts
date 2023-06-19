import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { teamSlug, slug, connectionId = "" } = JSON.parse(req.body);
  let connId: any = parseInt(connectionId);
  try {
    if (Number.isNaN(connId)) {
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

      connId = findConn?.id;
    }

    if (typeof connId === "number") {
      const deletedConn = await prisma.connections.delete({
        where: {
          id: connId,
        },
      });

      return res.status(200).json({ success: true, data: deletedConn });
    }

    return res.status(200).json({ success: false, data: "Failed to disconnect" });
  } catch (error: any) {
    console.log("Error in connection disconnection", error.message);

    return res.status(500).json({ success: false, message: error.message });
  }
}
