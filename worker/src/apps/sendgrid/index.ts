import { isEmpty, startCase } from "lodash";

import { IEventData } from "../../types";
import { httpClient } from "../../../utils";
import thankYouTemplate from "./templates/thankYou";

const emailTemplateMap: any = {
  sendThankyouEmail: {
    subject: "Thank You for Submitting the Form",
    template: thankYouTemplate,
  },
};

interface ISendgridData extends IEventData {
  userId: string;
  apiKeys: {
    accessToken: string;
  };
  taskData: {
    slug: string;
    template: {
      name: string;
      fromEmail: string;
    };
    [key: string]: any;
  };
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

const sendEmailNotification = async ({
  accessToken,
  sendgridData,
  baseUrl = "https://api.sendgrid.com/v3",
}: any) => {
  const sendEmail = await httpClient({
    endPoint: `${baseUrl}/mail/send`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: sendgridData,
  });

  return sendEmail;
};
const processSengrid = async (data: ISendgridData) => {
  const { eventData, apiKeys, app, taskData } = data;
  const { formSubmissionData, formData } = eventData;
  const { name: formName } = formData;
  const { fields: formValues } = formSubmissionData;
  const { appConfig } = app || {};
  const { accessToken } = apiKeys;
  const { slug: taskSlug, template } = taskData;

  if (isEmpty(template)) {
    return {
      success: false,
      message: "From email and Name not found",
    };
  }

  const emailTemplate = emailTemplateMap[taskSlug];

  const notificationData = {
    from: {
      email: template.fromEmail,
      name: template.name,
    },
    personalizations: [
      {
        to: [
          {
            email: formValues["email"],
            name: formValues["name"] || formValues["email"]?.split("@")[0] || "",
          },
        ],
      },
    ],
    subject: emailTemplate.subject,
    content: [
      {
        type: "text/html",
        value: emailTemplate.template({
          formName,
          data: formValues,
          formFiller: formValues["name"] || startCase(formValues["email"]?.split("@")[0] || ""),
          ownerName: template.name,
        }),
      },
    ],
  };

  const emailResponse = await sendEmailNotification({
    accessToken,
    sendgridData: notificationData,
    baseUrl: appConfig?.baseUrl,
  });

  return {
    emailResponse,
  };
};

export default processSengrid;
