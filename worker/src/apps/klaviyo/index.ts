import { IEventData } from "../../types";
import { httpClient } from "../../../utils";

interface IKlaviyoData extends IEventData {
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

interface IAddProfileData {
  accessToken: string;
  baseUrl: string;
  data: {
    [key: string]: any;
  };
}

const addProfiles = async ({ accessToken, data, baseUrl = "https://a.klaviyo.com/api" }: IAddProfileData) => {
  /* TODO: Handle Different types of Fields */
  const subscriperAdded = await httpClient({
    endPoint: `${baseUrl}/profiles`,
    method: "POST",
    body: data,
    headers: {
      Authorization: `Klaviyo-API-Key ${accessToken}`,
    },
  });

  return subscriperAdded;
};

const processKlaviyo = async (data: IKlaviyoData) => {
  const { actionSlug, eventData, apiKeys, app } = data;
  const { fields: formValues } = eventData.formSubmissionData;
  const { accessToken } = apiKeys;
  const { baseUrl } = app.appConfig;

  const actionMap: any = { addProfiles };

  const response = await actionMap[actionSlug]({ accessToken, baseUrl, data: formValues });

  return response;
};

export default processKlaviyo;
