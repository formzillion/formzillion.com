import { AxiosResponse, Method as AxiosMethods } from "axios";

// httpClientRequest interfac
export interface IHttpClient {
  endPoint: string;
  method?: AxiosMethods;
  headers?: object;
  body?: object | string;
}
// httpClientResponse interfac
export interface IHttpClientResp extends AxiosResponse {
  success: boolean;
  message: string;
  response: {
    data: any;
    status: number;
    statusText: string;
  };
}

// Forms interface
export interface IFormData {
  id: string;
  name: string;
  email: string;
  teamId: string;
  emailNotifications: boolean;
  sendToEmail: string[];
  autoResponder: boolean;
  autoResponderConfig: {
    template?: "welcome" | "thankYou";
    [key: string]: any;
  };
  [key: string]: any;
}

// FormSubmission fields interface
export interface IFormFields {
  [key: string]: any;
}

// FormSubmission interface
export interface IFormSubmissionData {
  id: string;
  status: string;
  fields: IFormFields;
  createdAt: string;
  updatedAt: string;
  formId: string;
  country?: string;
  ip?: string;
}

// Woker processor data interface
export interface IEventData {
  eventName: string;
  eventData: {
    formId: string;
    formSubmissionData: IFormSubmissionData;
    formData: IFormData;
  };
}

// Apikeys additionalData interface
interface IAdditionalApiData {
  [key: string]: any;
}

// ApiKeys of the collection table interface
export interface IApiKeys {
  accessToken: string;
  refreshToken?: string;
  additionalData?: IAdditionalApiData;
  [key: string]: any;
}

interface IWorkflowAction {
  connectionId: string;
  appName: string;
  appId: string;
  action: string;
  actionTemplate: IActionTemplate[];
}

interface IActionTemplate {
  slug: string;
  mapData: {
    [key: string]: string;
  };
  template: string;
}
