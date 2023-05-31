import {
  ArrowPathRoundedSquareIcon,
  Bars3CenterLeftIcon,
  BoltIcon,
  CircleStackIcon,
  ClipboardDocumentCheckIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
  LinkIcon,
  PencilSquareIcon,
  SparklesIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export const heroSection: any = [
  {
    slug: "slack",
    title: "Slack",
    description:
      "Integrate Slack with your daily apps on Formzillion, empowering team collaboration for faster goal achievement.",
    image: "/brands/slack.png",
    videoUrl: "slack.webm",
    docsLink: `${process.env.NEXT_PUBLIC_DOCS_URL}/integrations/automate-slack-notifications-for-form-submissions`,
    steps: [
      {
        icon: (
          <Square3Stack3DIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Stay structured — Publish fresh form submissions to designated public or private Slack channels.",
      },
      {
        icon: <BoltIcon className="inline w-6 h-6 mr-1 text-orange-500" />,
        description:
          "Real-time notifications — Gain instant access to form submission data, enabling your team to respond swiftly.",
      },
      {
        icon: (
          <CursorArrowRaysIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Easy configuration — Establish a direct connection to your Slack workspace with just a few clicks.",
      },
    ],
  },
  {
    slug: "webhooks",
    title: "Webhook",
    description:
      "Submit your form data to specific URL endpoints by utilizing POST requests.",
    image: "/brands/webhooks.png",
    videoUrl: "webhooks.webm",
    docsLink: `${process.env.NEXT_PUBLIC_DOCS_URL}/integrations/automate-the-transfer-of-form-data-to-webhooks-endpoint`,
    steps: [
      {
        icon: <LinkIcon className="inline w-6 h-6 mr-1 text-orange-500" />,
        description:
          "Quick connection — Streamline your form workflows in mere minutes, establishing immediate connections and ensuring a smooth flow of information.",
      },
      {
        icon: (
          <CubeTransparentIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Versatile Applications — Utilize webhooks to send your form data to any destination, serving limitless purposes.",
      },
      {
        icon: (
          <CodeBracketIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Simplified Integration — Integrate your forms with other applications effortlessly, requiring no coding skills - just a simple URL.",
      },
    ],
  },
  {
    slug: "sendgrid",
    title: "Sendgrid",
    description:
      "Seamlessly integrate SendGrid into Formzillion for efficient email delivery and enhanced communication capabilities.",
    image: "/brands/sendgrid.png",
    videoUrl: "sendgrid.webm",
    docsLink: `${process.env.NEXT_PUBLIC_DOCS_URL}/integrations/automate-sendgrid-to-send-emails`,
    steps: [
      {
        icon: (
          <CircleStackIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Effortless Data Delivery — Efficiently transmit your email data through SendGrid's robust infrastructure, ensuring reliable and timely delivery to recipients.",
      },
      {
        icon: <CpuChipIcon className="inline w-6 h-6 mr-1 text-orange-500" />,
        description:
          "Instant Connectivity — Bridge communication gaps instantly by leveraging SendGrid's efficient email delivery services.",
      },
      {
        icon: (
          <ArrowPathRoundedSquareIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Endless Applications — Unlock the infinite possibilities of SendGrid to send your emails to any destination for any purpose.",
      },
    ],
  },
  {
    slug: "mailerlite",
    title: "Mailerlite",
    description:
      "Effortlessly integrate MailerLite into Formzillion for streamlined email marketing and enhanced communication.",
    image: "/brands/mailerlite.png",
    videoUrl: "mailerlite.webm",
    docsLink: `${process.env.NEXT_PUBLIC_DOCS_URL}/integrations/automate-subscriber-addition-to-mailerlite`,
    steps: [
      {
        icon: <SparklesIcon className="inline w-6 h-6 mr-1 text-orange-500" />,
        description:
          "Platform — Integrate forms with MailerLite, a powerful email marketing platform",
      },
      {
        icon: (
          <ClipboardDocumentCheckIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Email Campaigns — Create and manage email campaigns for your customers.",
      },
    ],
  },
  {
    slug: "airtable",
    title: "Airtable",
    description:
      "Integrate Airtable into Formzillion for seamless data management and streamlined workflow automation.",
    image: "/brands/airtable.png",
    videoUrl: "airtable.webm",
    docsLink: `${process.env.NEXT_PUBLIC_DOCS_URL}/integrations/automate-record-creation-in-airtable`,
    steps: [
      {
        icon: <LinkIcon className="inline w-6 h-6 mr-1 text-orange-500" />,
        description:
          "Connect forms to Airtable, a flexible cloud-based database tool.",
      },
      {
        icon: (
          <ArrowPathRoundedSquareIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Automate the creation of new records in Airtable based on form submissions.",
      },
      {
        icon: (
          <Square3Stack3DIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Efficiently organize and manage data in Airtable for streamlined workflows.",
      },
    ],
  },
  {
    slug: "freshdesk",
    title: "Freshdesk",
    description:
      "Integrate Freshdesk into Formzillion for enhanced customer support and streamlined ticket management.",
    image: "/brands/freshdesk.png",
    videoUrl: "freshdesk.webm",
    docsLink: `${process.env.NEXT_PUBLIC_DOCS_URL}/integrations/automate-ticket-creation-in-freshdesk`,
    steps: [
      {
        icon: (
          <PencilSquareIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Integrate forms with Freshdesk, a popular customer support software",
      },
      {
        icon: <BoltIcon className="inline w-6 h-6 mr-1 text-orange-500" />,
        description:
          "Automate support ticket creation and trigger actions based on form submissions",
      },
      {
        icon: (
          <Bars3CenterLeftIcon className="inline w-6 h-6 mr-1 text-orange-500" />
        ),
        description:
          "Streamline support processes for efficient handling of customer inquiries.",
      },
    ],
  },
];
