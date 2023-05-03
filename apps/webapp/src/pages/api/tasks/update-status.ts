import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = req.body;

  try {
    const updatedTask = await prisma.tasks.update({
      where: {
        id: reqBody.taskId,
      },
      data: {
        status: reqBody.status,
      },
    });

    return res.status(200).json({ success: true, data: updatedTask });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, data: {}, errorMsg: error.message });
  }
}
