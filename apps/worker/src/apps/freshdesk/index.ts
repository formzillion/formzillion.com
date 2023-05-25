import { IEventData } from "../../types";
import { httpClient } from "../../../utils";

interface IFreshdeskData extends IEventData {
  userId: string;
  actionSlug: string;
  apiKeys: {
    accessToken: string;
    additionalData: {
      freshdeskSubDomain: string;
      ccEmail: string;
    };
  };
  app: {
    slug: string;
    name: string;
    id: string;
    status: string;
    appConfig: {
      [key: string]: any;
    };
  };
}

interface ICreateTicketData {
  accessToken: string;
  freshdeskSubDomain: string;
  ccEmails: string;
  data: {
    [key: string]: any;
  };
}

const createTicket = async ({ accessToken, freshdeskSubDomain, ccEmails = "", data }: ICreateTicketData) => {
  const reqBody = {
    email: data?.email || "",
    name: data?.name || data.firstName || data.lastName || "",
    description: data?.description || data?.message || data?.msg || "",
    subject: data?.subject || data?.title || `Created via ${data?.formName} Form`,
    priority: parseInt(data?.priority) || 1,
    status: parseInt(data?.status) || 2,
    tags: data?.tags?.split(",") || [],
    cc_emails: ccEmails
      .split(",")
      .map((e: string) => e.trim())
      .filter((e: string) => e !== ""),
  };

  const ticketCreated = await httpClient({
    endPoint: `https://${freshdeskSubDomain}.freshdesk.com/api/v2/tickets`,
    method: "POST",
    body: reqBody,
    headers: {
      Authorization: `Basic ${Buffer.from(`${accessToken}:`).toString("base64")}`,
    },
  });

  return ticketCreated;
};

const processFreshdesk = async (data: IFreshdeskData) => {
  const { actionSlug, eventData, apiKeys } = data;
  const { name: formName } = eventData.formData;
  const { fields: formValues } = eventData.formSubmissionData;
  const { accessToken, additionalData } = apiKeys;

  const actionMap: any = { createTicket };

  const response = await actionMap[actionSlug]({
    accessToken,
    ...additionalData,
    data: { ...formValues, formName },
  });

  return response;
};

export default processFreshdesk;
