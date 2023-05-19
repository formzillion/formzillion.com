import { httpClient } from "../../../utils";
import { IEventData } from "../../types";

interface IWebhooks extends IEventData {
  userId: string;
  apiKeys: {
    webhooksEndpoint: string;
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

const processWebhooks = async (data: IWebhooks) => {
  const { formSubmissionData, formData, formId } = data.eventData;
  const { webhooksEndpoint = "" } = data.apiKeys;

  if (webhooksEndpoint !== "") {
    const sendedData = await httpClient({
      method: "POST",
      endPoint: webhooksEndpoint,
      body: {
        eventType: "formSubmission",
        eventData: {
          formId,
          formName: formData.name,
          submittedAt: formSubmissionData.createdAt,
          submissionId: formSubmissionData.id,
          submittedValues: formSubmissionData.fields,
          ipOrigin: formSubmissionData.ip,
          countryOrigin: formSubmissionData.country,
        },
      },
    });

    return sendedData;
  }
};

export default processWebhooks;
