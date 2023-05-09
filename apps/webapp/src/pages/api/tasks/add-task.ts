import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    workflowId,
    type,
    appId,
    connectionId,
    name,
    template,
    actionSlug = "",
    appSlug = "",
  } = req.body;

  try {
    const actionExits = await prisma.tasks.findFirst({
      where: {
        appId,
        type,
        connectionId,
        workflowId,
        slug: actionSlug,
      },
    });

    let taskData = {};

    if (actionExits) {
      taskData = await prisma.tasks.update({
        where: {
          id: actionExits.id,
        },
        data: {
          name,
          template,
          type,
          appId,
          connectionId,
          appSlug,
          slug: actionSlug,
          status: "active",
        },
      });
    } else {
      taskData = await prisma.tasks.create({
        data: {
          workflowId,
          appId,
          name,
          type,
          connectionId,
          template,
          status: "active",
          appSlug,
          slug: actionSlug,
        },
      });
    }

    return res.status(200).json({ success: true, data: taskData });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, data: {}, errorMsg: error.message });
  }
}
