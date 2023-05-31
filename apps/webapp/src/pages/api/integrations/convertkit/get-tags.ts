import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { connectionId } = req.body;
      const getConn = (await prisma.connections.findUnique({
        where: {
          id: parseInt(connectionId),
        },
        select: {
          apiKeys: true,
        },
      })) as any;

      let accessToken = getConn?.apiKeys?.accessToken;
      const getConvertkitTags = await fetch(
        `https://api.convertkit.com/v3/tags?api_key=${accessToken}`
      );
      const tagsResp = await getConvertkitTags.json();
      return res.status(200).json({ success: true, data: tagsResp });
    }
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: JSON.stringify(error, null, 2) });
  }
}
