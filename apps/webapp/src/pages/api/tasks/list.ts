import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = req.body;
  const tasks = await prisma.tasks.findMany({
    where: {
      workflowId: reqBody.workflowId,
      status: reqBody.status,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return res.status(200).json({ success: true, data: tasks });
}
