import { isEmpty } from "lodash";

import * as apps from "./apps";
import { Logger, prisma } from "../utils";
import { IEventData } from "./types";
import { processDefaultActions } from "./defaultActions";

const appSlugToAppMap = {} as { [key: string]: any };

const allApps: any = apps;

const processFormEvents = async ({ data }: { data: IEventData }) => {
  const { eventName, eventData } = data;
  const { formSubmissionData, formId } = eventData || {};

  try {
    // Creating an slug to app map for getting the app config
    if (isEmpty(appSlugToAppMap)) {
      const getApps = await prisma.apps.findMany();
      getApps.forEach((app) => {
        appSlugToAppMap[app.slug] = app;
      });
    }

    /* Performing Default action like sending email notification and autoresponding for a form submissions */
    await processDefaultActions({ data });

    // Fetching the Workflows based on the formId
    const workflowData = await prisma.workflows.findFirst({
      where: { formId },
      include: {
        tasks: {
          where: { status: "active" },
          include: {
            connection: true,
          },
        },
      },
    });

    if (!workflowData) {
      return {
        success: false,
        message: `Workflow not found for formId: ${formId}`,
      };
    }

    for await (const task of workflowData?.tasks) {
      // Fetching the connection details for connectionId
      const { apiKeys, appSlug, id: connId } = task?.connection || {};

      // Sending the required data to the apps
      const app = appSlugToAppMap[appSlug] || {};
      const processedData = await allApps[appSlug]({
        actionSlug: task.slug || "",
        apiKeys,
        app,
        taskData: task,
        connId,
        ...data,
      });

      continue;
    }

    return {
      success: true,
      message: `For submission id: ${formSubmissionData.id} event processed successfully!`,
    };
  } catch (error: any) {
    Logger.error(`${JSON.stringify(error, null, 2)}`);

    return {
      success: false,
      message: `Failed to process event for submission id: ${formSubmissionData.id} due to ${error.message}`,
    };
  }
};

export default processFormEvents;
