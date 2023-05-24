import { IEventData } from "../../types";
import { httpClient } from "../../../utils";

interface IMailerliteData extends IEventData {
  userId: string;
  actionSlug: string;
  apiKeys: {
    accessToken: string;
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

interface IAddSubscriberData {
  accessToken: string;
  baseUrl: string;
  data: {
    [key: string]: any;
  };
}

const addSubscriber = async ({
  accessToken,
  data,
  baseUrl = "https://api.mailerlite.com/api/v2",
}: IAddSubscriberData) => {
  /* TODO: Handle Different types of Fields */
  const subscriperAdded = await httpClient({
    endPoint: `${baseUrl}/subscribers`,
    method: "POST",
    body: data,
    headers: {
      "X-MailerLite-ApiKey": accessToken,
    },
  });

  return subscriperAdded;
};

const processMailerlite = async (data: IMailerliteData) => {
  const { actionSlug, eventData, apiKeys, app } = data;
  const { fields: formValues } = eventData.formSubmissionData;
  const { accessToken } = apiKeys;
  const { baseUrl } = app.appConfig;

  const actionMap: any = { addSubscriber };

  const response = await actionMap[actionSlug]({ accessToken, baseUrl, data: formValues });

  return response;
};

export default processMailerlite;
