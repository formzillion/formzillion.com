import { isEmpty } from "lodash";
import knex from "knex";
// Initializing knex for Postgress
const pg = knex({ client: "pg", connection: process.env.PG_URL });
global.pg = pg;

import * as apps from "./apps";
import { IEventData } from "./types";
import { processDefaultActions } from "./defaultActions";
import exportSubmissions from "./exports";

const appSlugToAppMap = {};

const processFormEvents = async ({ data }: { data: IEventData }) => {
  const { eventName, eventData } = data;
  const { formSubmissionData, formId } = eventData || {};

  try {
    if (eventName === "export-submissions") {
      return await exportSubmissions(eventData);
    }
    // Creating an slug to app map for getting the app config
    if (isEmpty(appSlugToAppMap)) {
      const getApps = await pg("apps").select("*");
      getApps.forEach((app: any) => {
        appSlugToAppMap[app.slug] = app;
      });
    }

    /* Performing Default action like sending email notification and autoresponding for a form submissions */
    await processDefaultActions({ data });

    // Fetching the Workflows based on the formId
    const workflow = await pg.from("workflows").select("*").where({ form_id: formId }).first();
    // Fetching all the different Tasks Associated with the Workflows

    // TODO: Need to implement the logic for processing the tasks using bull-mq flow producers
    // For now, we are directly processing the tasks
    const tasks = await pg
      .from("tasks")
      .select("*")
      .where({ workflow_id: workflow.id, status: "active" });

    for await (const task of tasks) {
      // Fetching the connection details for connectionId
      const conn = (await pg.from("connections").where({ id: task?.connection_id }).first()) || {};

      const { apiKeys, user_id: userId, appSlug, id: connId } = conn;

      // Sending the required data to the apps
      const app = appSlugToAppMap[appSlug] || {};
      const processedData = await apps[appSlug]({
        actionSlug: task.slug || "",
        userId,
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
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: `Failed to process event for submission id: ${formSubmissionData.id} due to ${error.message}`,
    };
  }
};

export default processFormEvents;
