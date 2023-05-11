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

  const parsedAppId = parseInt(appId);
  const parsedConnectionId = parseInt(connectionId);

  try {
    const actionExits = await prisma.tasks.findFirst({
      where: {
        type,
        workflowId,
        slug: actionSlug,
        appId: parsedAppId,
        connectionId: parsedConnectionId,
      },
    });

    let taskData = {};
    const taskDataToUpdate = {
      type,
      name,
      appSlug,
      template,
      workflowId,
      status: "active",
      slug: actionSlug,
      appId: parsedAppId,
      connectionId: parsedConnectionId,
      updatedAt: new Date(),
    };

    if (actionExits) {
      taskData = await prisma.tasks.update({
        where: {
          id: actionExits.id,
        },
        data: taskDataToUpdate,
      });
    } else {
      taskData = await prisma.tasks.create({
        data: taskDataToUpdate,
      });
    }

    return res.status(200).json({ success: true, data: taskData });
  } catch (error: any) {
    return res
      .status(200)
      .json({ success: false, data: {}, errorMsg: error.message });
  }
}
