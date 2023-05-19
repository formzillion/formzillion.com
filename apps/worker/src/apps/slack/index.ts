import { startCase } from "lodash";
import moment from "moment";

import { httpClient } from "../../../utils";
import { IApiKeys, IEventData } from "../../types";
import { newSubmissionTemplete } from "./templates/newSubmission";
import getTeamSlug from "../../helpers/getTeamSlug";
import { FZ_WEBAPP_URL } from "../../config";

interface ISendSlackMessage {
  accessToken: string;
  slackData: {
    channel: string;
    text?: string;
    blocks?: any[];
  };
  baseUrl: string;
}

interface ISlackData extends IEventData {
  userId: string;
  apiKeys: IApiKeys;
  app: {
    slug: string;
    name: string;
    id: string;
    status: string;
    appConfig: {
      baseUrl: string;
      [key: string]: any;
    };
  };
}

let teamIdToTeamSlugMap: any = {};

const sendSlackMessage = async ({
  accessToken,
  slackData,
  baseUrl = "https://slack.com/api",
}: ISendSlackMessage) => {
  const { data, success, message } = await httpClient({
    method: "POST",
    endPoint: `${baseUrl}/chat.postMessage`,
    body: slackData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return {
    success,
    message,
    data,
  };
};

const processSlack = async (data: ISlackData) => {
  const { formSubmissionData, formData, formId } = data.eventData;
  const { name: formName, email, teamId } = formData;
  const { accessToken, channel } = data.apiKeys;
  const {
    fields: formValues,
    id: submissionId,
    createdAt,
  } = formSubmissionData;
  const { appConfig } = data.app || {};

  let teamSlug = teamIdToTeamSlugMap[teamId] || "";

  if (!teamSlug) {
    teamIdToTeamSlugMap = await getTeamSlug({ teamId });
    teamSlug = teamIdToTeamSlugMap[teamId];
  }

  const templateSlackData = newSubmissionTemplete({
    date: moment(createdAt).format("LLL"),
    formName,
    formValues,
    formOwner: startCase(email.split("@")[0]),
    dashboardUrl: `${FZ_WEBAPP_URL}/${teamSlug}/${formId}`,
  });

  const slackData = {
    channel,
    ...templateSlackData,
  };

  const response = await sendSlackMessage({
    accessToken,
    slackData,
    baseUrl: appConfig?.baseUrl,
  });

  return response;
};

export default processSlack;
