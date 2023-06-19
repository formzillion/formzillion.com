import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import { get, isEmpty, startCase } from "lodash";
import { integrations } from "@/utils/integrations.constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { teamSlug, appSlug, connectionConfig, formId } = req.body;
  const { connectionName, apiKey, webhooksEndpoint } = connectionConfig || {};

  try {
    const supabase = createServerSupabaseClient({ req, res });
    const currentSession = await supabase.auth.getSession();
    const email = get(currentSession, "data.session.user.email", "");

    const user: any = await prisma.users.findFirst({
      where: { email },
      select: {
        id: true,
        teams: { where: { slug: teamSlug }, select: { id: true } },
      },
    });

    const teamId = get(user, "teams.0.id", "");

    const app: any = await prisma.apps.findFirst({
      where: { slug: appSlug, status: "active" },
      select: { slug: true, id: true },
    });

    if (!app) {
      return res
        .status(400)
        .json({ success: false, message: `App not found: ${appSlug}` });
    }

    // Checking if Connection already exists
    const findIfExists = await prisma.connections.findFirst({
      where: {
        appSlug,
        email: email,
        appId: app?.id,
        teamId: teamId,
      },
      select: {
        id: true,
      },
    });
    const connectionData = {
      appSlug,
      email,
      appId: app?.id,
      teamId: teamId,
      name: connectionName || `${startCase(appSlug)} Account`,
      status: "connected",
      apiKeys: {
        ...(apiKey && {
          accessToken: apiKey,
        }),
        ...(webhooksEndpoint && {
          webhooksEndpoint,
        }),
        additionalData: {
          ...connectionConfig,
        },
      },
    };

    let createdInfo: any = {};
    if (findIfExists) {
      createdInfo = await prisma.connections.update({
        where: { id: findIfExists.id },
        data: connectionData,
      });
    } else {
      createdInfo = await prisma.connections.create({
        data: connectionData,
      });
    }

    await createTask(createdInfo, formId);

    res.status(201).json({ success: true, data: createdInfo });
  } catch (error: any) {
    console.log("Error in add-connection", error.message);

    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Creates a task for a given form ID and connection data.
 * @param connectionData An object containing connection data.
 * @param formId A string representing the form ID.
 * @returns A Promise that resolves with the created task.
 */
const createTask = async (
  connectionData: { appSlug: string; appId: number; id: number },
  formId: string
): Promise<{ [key: string]: any }> => {
  try {
    const { appSlug, appId } = connectionData;

    const integrationConfig = integrations.find((i) => i.slug === appSlug) as {
      [key: string]: any;
    };
    const isTemplateRequired = !isEmpty(integrationConfig.template);
    if (isTemplateRequired) return {};

    const workflow = await prisma.workflows.findFirst({
      where: { formId },
      select: { id: true, name: true },
    });

    if (!workflow) return {};

    const { id } = workflow;
    const task = await prisma.tasks.findFirst({
      where: { appId, workflowId: id, connectionId: connectionData.id },
    });

    const taskSlug = get(integrationConfig, "actions.0", "");
    const taskDetails = {
      name: `${appSlug}_${taskSlug}`,
      slug: taskSlug,
      status: "active",
      appId,
      appSlug,
      connectionId: connectionData.id,
      workflowId: workflow.id,
      template: {},
      type: "action",
    };

    let taskData: { [key: string]: any } = {};
    if (!isEmpty(task)) {
      taskData = await prisma.tasks.update({
        where: { id: task.id },
        data: taskDetails,
      });
    } else {
      taskData = await prisma.tasks.create({
        data: taskDetails,
      });
    }

    return taskData;
  } catch (error: any) {
    console.log("Error from createTask in add-connection: ", error);
    return {};
  }
};
