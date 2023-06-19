interface IIntegrationType {
  name: string;
  formattedName: string;
  slug: string;
  icon: string;
  description: string;
  status: "not_connected" | "connected";
  authType: "oauth" | "api_key";
  isAvailable: boolean;
  connectionData: {
    id?: number | string;
    appId?: number;
    appSlug?: string;
    status?: string;
    apiKeys?: {
      [key: string]: any;
    };
  };
  gettingStarted: string;
  additionalInfo: string;
  config: {
    actions: string[];
    apiConfig: string[];
    template: {
      [key: string]: any;
    };
  };
}

export const integrations: IIntegrationType[] = [
  {
    name: "Slack",
    formattedName: "slack",
    slug: "slack",
    icon: "/brands/slack.svg",
    description:
      "Notify your Slack on specified channels whenever this form receives a new submission.",
    status: "not_connected",
    authType: "oauth",
    isAvailable: true,
    connectionData: {},
    gettingStarted:
      "To get you need to authorize Formzillion to access your Slack account. Once authorized, you will start getting notification for new form submissions",
    additionalInfo: "",
    config: {
      actions: ["sendNotification"],
      apiConfig: [],
      template: {},
    },
  },
  {
    name: "Sendgrid",
    formattedName: "sendgrid",
    slug: "sendgrid",
    icon: "/brands/sendgrid.svg",
    description:
      "Send an email through Sendgrid to customers who submitted this form.",
    status: "not_connected",
    authType: "api_key",
    isAvailable: true,
    connectionData: {},
    gettingStarted:
      "To get you need to authorize Formzillion to access your Sendgrid account. Once authorized, we will start sending email for new form submissions",
    additionalInfo: "",
    config: {
      actions: ["sendThankyouEmail"],
      apiConfig: [],
      template: {},
    },
  },
  {
    name: "Webhooks",
    formattedName: "webhooks",
    slug: "webhooks",
    icon: "/brands/webhooks.png",
    description:
      "Get the form submission values to your own webhooks endpoint.",
    status: "not_connected",
    authType: "api_key",
    isAvailable: true,
    connectionData: {},
    gettingStarted:
      "To get you need to authorize Formzillion to send data to your webhooks endpoint. Once authorized, you will start receiving data for new form submissions",
    additionalInfo:
      "You will be receiving the event data to the following webhook endpoint : {webhooksEndpoint}",
    config: {
      actions: ["postToWebhookEnpoint"],
      apiConfig: ["webhooksEndpoint"],
      template: {},
    },
  },
  {
    name: "Mailerlite",
    formattedName: "mailerlite",
    slug: "mailerlite",
    icon: "/brands/mailerlite.png",
    description:
      "Automatically add the form submission data to mailerlite marketing platform.",
    status: "not_connected",
    authType: "api_key",
    isAvailable: true,
    connectionData: {},
    gettingStarted:
      "To get you need to authorize Formzillion to access your Mailerlite account. Once authorized, we will start adding new subscriber for new form submissions",
    additionalInfo: "",
    config: {
      actions: ["addSubscriber"],
      apiConfig: [],
      template: { fromEmail: "formEmail", name: "name" },
    },
  },
  {
    name: "Airtable",
    formattedName: "airtable",
    slug: "airtable",
    icon: "/brands/airtable.png",
    description: "Import the form submission data to airtable.",
    status: "not_connected",
    authType: "oauth",
    isAvailable: true,
    connectionData: {},
    gettingStarted:
      "To get you need to authorize Formzillion to access your Airtable account. Once authorized, We will start inserting new record to your selected table for new form submissions",
    additionalInfo: "",
    config: {
      actions: ["addRecord"],
      apiConfig: [],
      template: { tables: [], tableId: "" },
    },
  },
  {
    name: "Freshdesk",
    formattedName: "freshdesk",
    slug: "freshdesk",
    icon: "/brands/freshdesk.png",
    description:
      "Automatically collect the customer related data from form submission and send it to Freshdesk.",
    status: "not_connected",
    authType: "api_key",
    isAvailable: true,
    connectionData: {},
    gettingStarted:
      "To get you need to authorize Formzillion to access your Freshdesk account. Once authorized, we will start creating new ticket for new form submissions",
    additionalInfo: "",
    config: {
      actions: ["createTicket"],
      apiConfig: ["freshdeskSubDomain", "apiKey", "ccEmails"],
      template: {},
    },
  },
  {
    name: "ConvertKit",
    formattedName: "convertkit",
    slug: "convertkit",
    icon: "/brands/convertkit.png",
    description:
      "Automatically add the form submission data to convertkit marketing platform",
    status: "not_connected",
    authType: "api_key",
    isAvailable: true,
    connectionData: {},
    gettingStarted:
      "To get you need to authorize Formzillion to access your ConvertKit account. Once authorized, We will start adding new subscriber for new form submissions",
    additionalInfo: "",
    config: {
      actions: ["addSubscriberToAForm"],
      apiConfig: ["apiKey", "apiSecret"],
      template: { tag: [] },
    },
  },
  {
    name: "Mailchimp",
    formattedName: "mailchimp",
    slug: "mailchimp",
    icon: "/brands/mailchimp.png",
    description: "Add customers who submitted this form to a Mailchimp list.",
    status: "not_connected",
    authType: "oauth",
    isAvailable: false,
    connectionData: {},
    gettingStarted: "",
    additionalInfo: "",
    config: {
      actions: ["addSubscriber"],
      apiConfig: [],
      template: {},
    },
  },
];
