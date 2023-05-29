import { IEventData } from "../../types";
import { httpClient } from "../../../utils";

interface IConvertKitData extends IEventData {
  userId: string;
  actionSlug: string;
  apiKeys: {
    additionalData: any;
    accessToken: string;
  };
  taskData: {
    slug: string;
    template: {
      tagId(arg0: string, tagId: any): unknown;
      tableId: string;
      tables: object[];
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

interface IAddSubscriberToAForm {
  accessToken: string;
  tag: string;
  apiSecret: string;
  baseUrl: string;
  data: {
    [key: string]: any;
  };
}

const addSubscriberToAForm = async ({ apiSecret, data, tag, baseUrl = "https://api.convertkit.com/v3/tags" }: IAddSubscriberToAForm) => {
  const email = data.email;
  const api_secret = apiSecret;
  /* TODO: Handle Different types of Fields */
  const subscriperAdded = await httpClient({
    endPoint: `${baseUrl}/${tag}/subscribe`,
    method: "POST",
    body: { email, api_secret },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return subscriperAdded;
};

const processConvertkit = async (data: IConvertKitData) => {
  const { actionSlug, eventData, apiKeys, app,taskData} = data;
  const  tagIds  = taskData.template;
  const tag = tagIds?.tagId;
  const { fields: formValues } = eventData.formSubmissionData;
  const { apiSecret } = apiKeys.additionalData;
  const { baseUrl } = app.appConfig;

  const actionMap: any = { addSubscriberToAForm };

  const response = await actionMap[actionSlug]({ apiSecret, tag, baseUrl, data: formValues });

  return response;
};

export default processConvertkit;
