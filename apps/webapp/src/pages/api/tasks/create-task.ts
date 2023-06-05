import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    template = {},
    appSlug = "",
    formId = "",
    teamSlug = "",
    taskSlug = "",
  } = req.body;
  console.log("req.body: ", req.body);

  try {
    const workflow: any = await prisma.workflows.findFirst({
      where: { formId, team: { slug: teamSlug } },
    });
    console.log("workflow: ", workflow);

    const connection: any = await prisma.connections.findFirst({
      where: { appSlug, team: { slug: teamSlug } },
    });
    console.log("connection: ", connection);

    const taskRequiredData = {
      connectionId: connection?.id,
      appId: connection?.appId,
      workflowId: workflow?.id,
      type: "action",
      appSlug: appSlug,
      name: `${appSlug}_${taskSlug}`,
      slug: taskSlug,
      template: template,
      status: "active",
    };

    console.log("taskRequiredData: ", taskRequiredData);

    const task = await prisma.tasks.findFirst({
      where: {
        appId: connection?.appId,
        connectionId: connection?.id,
        workflowId: workflow?.id,
      },
    });

    console.log("task: ", task);

    let taskData = {};
    if (!isEmpty(task)) {
      taskData = await prisma.tasks.update({
        where: {
          id: task?.id,
        },
        data: taskRequiredData,
      });
    } else {
      taskData = await prisma.tasks.create({
        data: taskRequiredData,
      });
    }
    return res.status(200).json({ success: true, data: taskData });
  } catch (error: any) {
    return res
      .status(200)
      .json({ success: false, data: {}, errorMsg: error.message });
  }
}
