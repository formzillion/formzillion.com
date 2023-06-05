interface IIntegration {
  actions: string[];
  apiConfig: string[];
  template: Record<string, unknown>;
}

interface IIntegrationsConfig {
  slack: IIntegration;
  sendgrid: IIntegration;
  webhooks: IIntegration;
  freshdesk: IIntegration;
  mailerlite: IIntegration;
  airtable: IIntegration;
  convertkit: IIntegration;
  [key: string]: IIntegration;
}

export const integrationsConfig: IIntegrationsConfig = {
  slack: {
    actions: ["sendNotification"],
    apiConfig: [],
    template: {},
  },
  sendgrid: {
    actions: ["sendThankyouEmail"],
    apiConfig: [],
    template: {},
  },
  webhooks: {
    actions: ["postToWebhookEnpoint"],
    apiConfig: ["connectionName", "webhooksEndpoint"],
    template: {},
  },
  freshdesk: {
    actions: ["createTicket"],
    apiConfig: ["connectionName", "freshdeskSubDomain", "apiKey", "ccEmails"],
    template: {},
  },
  mailerlite: {
    actions: ["addSubscriber"],
    apiConfig: [],
    template: { fromEmail: "formEmail", name: "name" },
  },
  airtable: {
    actions: ["addRecord"],
    apiConfig: [],
    template: { table: [] },
  },
  convertkit: {
    actions: ["addSubscriberToAForm"],
    apiConfig: ["connectionName", "apiKey", "apiSecret"],
    template: { tag: [] },
  },
};
