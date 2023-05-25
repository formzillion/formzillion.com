import { IEventData } from "../../types";
import { httpClient } from "../../../utils";

interface IConvertKitData extends IEventData {
  userId: string;
  actionSlug: string;
  apiKeys: {
    additionalData: any;
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

interface IAddSubscriberToAForm {
  accessToken: string;
  formId: string;
  baseUrl: string;
  data: {
    [key: string]: any;
  };
}

const addSubscriberToAForm = async ({
  accessToken,
  data,
  formId,
  baseUrl="https://api.convertkit.com/v3/forms",
}: IAddSubscriberToAForm) => {
  const email = data.email;
  const api_key = accessToken;
  /* TODO: Handle Different types of Fields */
  const subscriperAdded = await httpClient({
    endPoint: `${baseUrl}/${formId}/subscribe`,
    method: "POST",
    body: { email, api_key },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return subscriperAdded;
};

const processConvertkit = async (data: IConvertKitData) => {
  const { actionSlug, eventData, apiKeys, app } = data;
  const { formId } = apiKeys.additionalData;
  const { fields: formValues } = eventData.formSubmissionData;
  const { accessToken } = apiKeys;
  const { baseUrl } = app.appConfig;

  const actionMap: any = { addSubscriberToAForm };

  const response = await actionMap[actionSlug]({ accessToken, formId, baseUrl, data: formValues });

  return response;
};

export default processConvertkit;
