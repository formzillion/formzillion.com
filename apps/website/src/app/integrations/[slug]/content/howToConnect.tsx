import {
  Bars3CenterLeftIcon,
  CheckCircleIcon,
  EllipsisHorizontalCircleIcon,
  FolderPlusIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export const howToConnect = [
  {
    slug: "slack",
    title: "Slack",
    subtitle:
      "Easy Slack integration with your daily use apps on Formzillion, enables team collaborate to achieve goal must faster.",
    steps: [
      {
        icon: <LockClosedIcon className="inline w-6 h-6 mr-1 text-red-500" />,
        title: "Login",
        description:
          "Login to your Formzillion dashboard and navigate to the “Apps” Tab. Click on Slack “Connect”. This will bring an authorising window for you to authorise Slack. Here login into the Slack workspace.",
      },
      {
        icon: (
          <Bars3CenterLeftIcon className="inline w-6 h-6 mr-1 text-purple-500" />
        ),
        title: "Select channel",
        description:
          "After successfully connecting Formzillion to your Slack workspace, select the desired channel to post your form submissions.",
      },
      {
        icon: (
          <FolderPlusIcon className="inline w-6 h-6 mr-1 text-yellow-500" />
        ),
        title: "Select your form",
        description:
          "Now navigate to the “Forms” tab and select the form for which you want to set up slack notification for.",
      },
      {
        icon: (
          <EllipsisHorizontalCircleIcon className="inline w-6 h-6 mr-1 text-white" />
        ),
        title: "Add actions",
        description: `Under the selected form page navigate to the “Workflows” Tab, click on the “Actions” and select “Add action”. Here select the App as “Slack” and Connection which was connected previously.`,
      },
      {
        icon: (
          <CheckCircleIcon className="inline w-6 h-6 mr-1 text-green-500" />
        ),
        title: "Slack Notification",
        description:
          "Once slack is connected, all new submissions to your form will be posted to your Slack channel automatically.",
      },
    ],
  },
  {
    slug: "webhooks",
    title: "Webhooks",
    subtitle:
      "Integrating custom webhooks is a straightforward process that efficiently directs your form submission data to its intended destination.",
    steps: [
      {
        icon: <LockClosedIcon className="inline w-6 h-6 mr-1 text-red-500" />,
        title: "Login",
        description:
          "Login to your Formzillion dashboard and navigate to the “Apps” Tab. Click on Webhooks “Connect”.",
      },
      {
        icon: (
          <Bars3CenterLeftIcon className="inline w-6 h-6 mr-1 text-purple-500" />
        ),
        title: "Add Webhooks endpoint",
        description:
          "Enter the Connection Name and Webhooks endpoint and click on Add.",
      },
      {
        icon: (
          <FolderPlusIcon className="inline w-6 h-6 mr-1 text-yellow-500" />
        ),
        title: "Select your form",
        description:
          "Now navigate to the “Forms” tab and select the form for which you want to set up Webhooks workflow.",
      },
      {
        icon: (
          <EllipsisHorizontalCircleIcon className="inline w-6 h-6 mr-1 text-white" />
        ),
        title: "Add actions",
        description:
          "Under the selected form page navigate to the “Workflows” Tab, click on the “Actions” and select “Add action”. Here select the App as “Webhooks” and Connection which was connected previously.",
      },
      {
        icon: (
          <CheckCircleIcon className="inline w-6 h-6 mr-1 text-green-500" />
        ),
        title: "Webhook payload",
        description:
          "Upon successfully connecting Webhook, all new submissions to your form will be posted to your configured webhook URL.",
      },
    ],
  },
  {
    slug: "freshdesk",
    title: "Freshdesk",
    subtitle:
      "Connect your forms with Freshdesk, a widely used customer support software, to automate the creation of support tickets based on form submissions, enhancing your customer service workflow.",
    steps: [
      {
        icon: <LockClosedIcon className="inline w-6 h-6 mr-1 text-red-500" />,
        title: "Login",
        description:
          "Login to your Formzillion dashboard and navigate to the “Apps” Tab. Click on Freshdesk “Connect”.",
      },
      {
        icon: (
          <Bars3CenterLeftIcon className="inline w-6 h-6 mr-1 text-purple-500" />
        ),
        title: "Add Sub Domain & API key",
        description:
          "Enter the Connection Name, Freshdesk Sub Domain and API Key and click on Add.",
      },
      {
        icon: (
          <FolderPlusIcon className="inline w-6 h-6 mr-1 text-yellow-500" />
        ),
        title: "Select your form",
        description:
          "Now navigate to the “Forms” tab and select the form for which you want to set up Freshdesk workflow.",
      },
      {
        icon: (
          <EllipsisHorizontalCircleIcon className="inline w-6 h-6 mr-1 text-white" />
        ),
        title: "Add actions",
        description:
          "Under the selected form page navigate to the “Workflows” Tab, click on the “Actions” and select “Add action”. Here select the App as “Freshdesk” and Connection which was connected previously. Select “Create Ticket” as an action.",
      },
      {
        icon: (
          <CheckCircleIcon className="inline w-6 h-6 mr-1 text-green-500" />
        ),
        title: "Create Ticket",
        description:
          "Upon successfully connecting Frshdesk, all new submissions to your form will automatically generate a new ticket in your Freshdesk.",
      },
    ],
  },
  {
    slug: "airtable",
    title: "Airtable",
    subtitle:
      "By integrating Airtable with Formzillion, every new form submission you receive will automatically generate a new entry in your Airtable.",
    steps: [
      {
        icon: <LockClosedIcon className="inline w-6 h-6 mr-1 text-red-500" />,
        title: "Login",
        description:
          "Login to your Formzillion dashboard and navigate to the “Apps” Tab. Click on Airtable “Connect”. This will bring an authorising window for you to authorise Airtable. Here login into the Airtable.",
      },
      {
        icon: (
          <Bars3CenterLeftIcon className="inline w-6 h-6 mr-1 text-purple-500" />
        ),
        title: "Select workspace",
        description:
          "Select the workspace in which table is present and click on “Grant”.",
      },
      {
        icon: (
          <FolderPlusIcon className="inline w-6 h-6 mr-1 text-yellow-500" />
        ),
        title: "Select your form",
        description:
          "Now navigate to the “Forms” tab and select the form for which you want to set up Airtable workflow.",
      },
      {
        icon: (
          <EllipsisHorizontalCircleIcon className="inline w-6 h-6 mr-1 text-white" />
        ),
        title: "Add actions",
        description:
          "Under the selected form page navigate to the “Workflows” Tab, click on the “Actions” and select “Add action”. Here select the App as “Airtable” and Connection which was connected previously. “Add Record” as an action and Select “Table” to which you want to add the record.",
      },
      {
        icon: (
          <CheckCircleIcon className="inline w-6 h-6 mr-1 text-green-500" />
        ),
        title: "Airtable Record",
        description:
          "Upon successfully connecting Airtable, all new submissions to your form will be sent to your Airtable selected table.",
      },
    ],
  },
  {
    slug: "mailerlite",
    title: "Mailerlite",
    subtitle:
      "Integrate Mailterlite with Formzillion to add new subscribers to your MailerLite email marketing platform.",
    steps: [
      {
        icon: <LockClosedIcon className="inline w-6 h-6 mr-1 text-red-500" />,
        title: "Login",
        description:
          "Login to your Formzillion dashboard and navigate to the “Apps” Tab. Click on Mailerlite “Connect”.",
      },
      {
        icon: (
          <Bars3CenterLeftIcon className="inline w-6 h-6 mr-1 text-purple-500" />
        ),
        title: "Add API key",
        description: "Enter the Connection Name and API Key and click on Add.",
      },
      {
        icon: (
          <FolderPlusIcon className="inline w-6 h-6 mr-1 text-yellow-500" />
        ),
        title: "Select your form",
        description:
          "Now navigate to the “Forms” tab and select the form for which you want to set up Mailerlite emails workflow.",
      },
      {
        icon: (
          <EllipsisHorizontalCircleIcon className="inline w-6 h-6 mr-1 text-white" />
        ),
        title: "Add actions",
        description:
          "Under the selected form page navigate to the “Workflows” Tab, click on the “Actions” and select “Add action”. Here select the App as “Mailerlite” and Connection which was connected previously and “Add Subscriber” as an action.",
      },
      {
        icon: (
          <CheckCircleIcon className="inline w-6 h-6 mr-1 text-green-500" />
        ),
        title: "Add subscriber",
        description:
          "Upon successfully connecting Mailerlite, all new submissions to your form will be subscribed to your Mailerlite automatically.",
      },
    ],
  },
  {
    slug: "sendgrid",
    title: "Sendgrid",
    subtitle:
      "Add the Sendgrid workflow action for form submissions to send the emails to your form submitters",
    steps: [
      {
        icon: <LockClosedIcon className="inline w-6 h-6 mr-1 text-red-500" />,
        title: "Login",
        description:
          "Login to your Formzillion dashboard and navigate to the “Apps” Tab. Click on Sendgrid “Connect”.",
      },
      {
        icon: (
          <Bars3CenterLeftIcon className="inline w-6 h-6 mr-1 text-purple-500" />
        ),
        title: "Add API key",
        description: "Enter the Connection Name and API Key and click on Add.",
      },
      {
        icon: (
          <FolderPlusIcon className="inline w-6 h-6 mr-1 text-yellow-500" />
        ),
        title: "Select your form",
        description:
          "Now navigate to the “Forms” tab and select the form for which you want to set up Sendgrid emails workflow.",
      },
      {
        icon: (
          <EllipsisHorizontalCircleIcon className="inline w-6 h-6 mr-1 text-white" />
        ),
        title: "Add actions",
        description:
          "Under the selected form page navigate to the “Workflows” Tab, click on the “Actions” and select “Add action”. Here select the App as “Sendgrid” and Connection which was connected previously.",
      },
      {
        icon: (
          <CheckCircleIcon className="inline w-6 h-6 mr-1 text-green-500" />
        ),
        title: "Sendgrid inbox",
        description:
          "Upon successfully connecting SendGrid, every new form submitter will automatically receive an email notification.",
      },
    ],
  },
];
