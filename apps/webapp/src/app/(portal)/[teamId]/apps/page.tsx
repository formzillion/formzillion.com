import React from "react";
import { PageProps } from "@/types/PageProps";
import integrationMap from "./integrationsMap";
import IntegrationItem from "./IntegrationItem";

const integrations = [
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
  },
  {
    name: "Airtable",
    formattedName: "airtable",
    slug: "airtable",
    icon: "/brands/airtable.png",
    description: "Import the form submission data to airtable.",
    status: "not_connected",
    authType: "airtable",
    isAvailable: true,
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
  },
  {
    name: "Typeform",
    formattedName: "typeform",
    slug: "typeform",
    icon: "/brands/typeform.png",
    description:
      "Associate and merge  any submissions from this form with those from a Typeform form.",
    status: "not_connected",
    authType: "oauth",
    isAvailable: false,
  },
];

export default async function Page({ params }: PageProps) {
  const teamSlug = params.teamId;
  const finalIntegrations = await integrationMap({ integrations, teamSlug });

  return (
    <div className="dark:bg-neutral-900 min-h-screen">
      <div className="grid lg:grid-cols-4 p-4 mx-auto max-w-xs sm:max-w-7xl md:grid-cols-3 md:4 sm:grid-cols-2 md:max-w-7xl">
        {finalIntegrations.map((integration: any, idx: number) => (
          <IntegrationItem
            integration={integration}
            key={idx}
            teamSlug={teamSlug}
          />
        ))}
      </div>
    </div>
  );
}
