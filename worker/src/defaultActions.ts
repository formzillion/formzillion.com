import { get, isEmpty, startCase } from "lodash";
import moment from "moment";

import { httpClient } from "../utils";
import { IEventData } from "./types";
import { newFormSubmissionConent } from "./apps/sendgrid/templates/newSubmission";
import { thankYouTemplate } from "./apps/sendgrid/templates/thankYou";
import { welcomeTemplate } from "./apps/sendgrid/templates/welcome";
import { apiKey, fromEmailData } from "./config/sengrid";
import { FZ_WEBAPP_URL } from "./config";
import getTeamSlug from "./helpers/getTeamSlug";

let teamIdToTeamSlugMap = {} as { [key: string]: string };
const emailTemplateMap: any = {
  welcome: welcomeTemplate,
  thankYou: thankYouTemplate,
};
const emailSubject: any = {
  welcome: "Welcome to the Formzillion",
  thankYou: "Thank You for Submitting the Form",
};

const sendEmail = async ({ data, apiKey }: any) => {
  return await httpClient({
    endPoint: `https://api.sendgrid.com/v3/mail/send`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: data,
  });
};

export const processDefaultActions = async ({ data }: { data: IEventData }) => {
  const { formData, formSubmissionData, formId } = data.eventData;
  const {
    name: formName,
    email: formOwnerEmail,
    teamId,
    sendToEmail = [],
    emailNotifications,
    autoResponder,
    autoResponderConfig,
  } = formData;
  const { fields: formValues, createdAt } = formSubmissionData;
  const responseResult: any = {};

  /* Ignore the default actions if customer email notifications are disabled */
  if (!emailNotifications && !autoResponder) {
    return;
  }

  let teamSlug = teamIdToTeamSlugMap[teamId];
  if (!teamSlug) {
    teamIdToTeamSlugMap = await getTeamSlug({ teamId });
    teamSlug = teamIdToTeamSlugMap[teamId];
  }

  const ownerName = startCase(formOwnerEmail.split("@")[0]);

  /* Handling the Email Notifications */
  if (emailNotifications) {
    const emailsArr = get(sendToEmail, "0", "").includes(",")
      ? sendToEmail[0]?.split(",")
      : sendToEmail;
    const filteredEmails = emailsArr.filter((e) => e !== "");
    const toEmails = !isEmpty(filteredEmails)
      ? filteredEmails
      : [formOwnerEmail];

    if (!isEmpty(toEmails)) {
      const notificationData = {
        from: fromEmailData,
        personalizations: [{ to: toEmails.map((email) => ({ email })) }],
        subject: `New Submission - ${formName}`,
        content: [
          {
            type: "text/html",
            value: newFormSubmissionConent({
              data: formValues,
              dashboardUrl: `${FZ_WEBAPP_URL}/${teamSlug}/${formId}`,
              formName: formName,
              ownerName: ownerName,
              date: moment(createdAt).format("MMMM Do YYYY, h:mm:ss a"),
            }),
          },
        ],
      };
      responseResult.notification = await sendEmail({
        data: notificationData,
        apiKey,
      });
    }
  }

  /* Handling the Autoresponder Config
    TODO: Implement the Custom Auto Responders
  */
  if (autoResponder) {
    const { template = "" } = autoResponderConfig || {};
    if (formValues.email) {
      let autoResponderData: any = {
        from: fromEmailData,
        personalizations: [{ to: [{ email: formValues.email }] }],
        subject: emailSubject[template],
        content: [],
      };

      if (emailTemplateMap[template]) {
        autoResponderData.content = [
          {
            type: "text/html",
            value: emailTemplateMap[template]({
              data: formValues,
              formFiller:
                formValues["name"] ||
                formValues["email"]?.split("@")[0] ||
                "John Doe",
              formName,
              ownerName,
            }),
          },
        ];
      }

      responseResult.autoResponder = await sendEmail({
        data: autoResponderData,
        apiKey,
      });
    }
  }

  return responseResult;
};
