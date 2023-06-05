import Link from "next/link";
import { FiGithub, FiLinkedin, FiSlack } from "react-icons/fi";
import AppIcon from "@/ui/AppIcon";

const footerLinks = [
  {
    title: "Product",
    list: [
      {
        label: "Blog",
        href: "/blog",
        target: "_self",
      },
      {
        label: "Documentation",
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}`,
        target: "_blank",
      },
      {
        label: "Pricing",
        href: "/pricing",
        target: "_self",
      },
      {
        label: "Roadmap",
        href: "https://github.com/orgs/formzillion/projects/1",
        target: "_blank",
      },
      {
        label: "Status",
        href: "https://formzillion.github.io/status/",
        target: "_blank",
      },
    ],
  },
  {
    title: "Guides",
    href: "/guides",
    list: [
      {
        label: "Gatsby",
        href: "/guides/gatsby",
        target: "_self",
      },
      {
        label: "Nextjs",
        href: "/guides/nextjs",
        target: "_self",
      },
      {
        label: "Webflow",
        href: "/guides/webflow",
        target: "_self",
      },
      {
        label: "Wordpress",
        href: "/guides/wordpress",
        target: "_self",
      },
      {
        label: "Ghost",
        href: "/guides/ghost",
        target: "_self",
      },
      {
        label: "More...",
        href: "/guides",
        target: "_self",
      },
    ],
  },
  {
    title: "Integrations",
    href: "/integrations",
    list: [
      {
        label: "Airtable",
        href: "/integrations/airtable",
        target: "_self",
      },
      {
        label: "Freshdesk",
        href: "/integrations/freshdesk",
        target: "_self",
      },
      {
        label: "Mailerlite",
        href: "/integrations/mailerlite",
        target: "_self",
      },
      {
        label: "Sendgrid",
        href: "/integrations/sendgrid",
        target: "_self",
      },
      {
        label: "Slack",
        href: "/integrations/slack",
        target: "_self",
      },
      {
        label: "Webhooks",
        href: "/integrations/webhooks",
        target: "_self",
      },
    ],
  },
  {
    title: "Features",
    list: [
      {
        label: "Spam Filtering",
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/spam-filtering`,
        target: "_blank",
      },
      {
        label: "Redirects",
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/redirects`,
        target: "_blank",
      },
      {
        label: "Collaboration",
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/collaboration`,
        target: "_blank",
      },
      {
        label: "Exports",
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/exports`,
        target: "_blank",
      },
      {
        label: "Email Notifications",
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/email-notifications`,
        target: "_blank",
      },
      {
        label: "Autoresponders",
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/autoresponders`,
        target: "_blank",
      },
    ],
  },
  {
    title: "Compare",
    list: [
      {
        label: "Formspree",
        href: "/compare/formspree",
        target: "_self",
      },
      {
        label: "getform",
        href: "/compare/getform",
        target: "_self",
      },
      {
        label: "Basin",
        href: "/compare/basin",
        target: "_self",
      },
      {
        label: "Formspark",
        href: "/compare/formspark",
        target: "_self",
      },
      {
        label: "Formcarry",
        href: "/compare/formcarry",
        target: "_self",
      },
    ],
  },
];

const FooterIcons = [
  {
    icon: <FiLinkedin className="text-gray-400 hover:text-blue-800" />,
    url: "https://www.linkedin.com/company/formzillion/",
    hoverColor: "hover:border-blue-800 hover:text-blue-800",
  },
  {
    icon: <FiGithub className="text-gray-400 hover:text-white" />,
    url: "https://github.com/formzillion/formzillion.com",
    hoverColor: "hover:border-white",
  },
  {
    icon: <FiSlack className="text-gray-400 hover:text-purple-900" />,
    url: "https://formzillion.slack.com/join/shared_invite/zt-1urntbbmb-o0d6Qzdl~GzfePoZE7JTYw",
    hoverColor: "hover:border-purple-800",
  },
];

export default function Footer() {
  return (
    <div className="relative border-t border-gray-800 bg-gray-900/20">
      <div className="mx-auto max-w-7xl px-4 lg:px-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex mt-8 text-white justify-between">
          {footerLinks.map((data: any, idx: number) => (
            <div key={idx} className="mt-4 md:mt-0">
              {data.href ? (
                <Link
                  href={data.href}
                  className="text-gray-300 text-base font-medium hover:text-gray-100"
                >
                  {data.title}
                </Link>
              ) : (
                <p className="text-gray-300 text-base font-medium">
                  {data.title}
                </p>
              )}
              <div className="gap-2 text-sm flex flex-col mt-4 text-gray-400">
                {data.list.map((item: any, index: number) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.target}
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center space-x-2">
          <span className="mr-2">Follow us</span>
          {FooterIcons.map((item: any, idx: number) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`border border-gray-500 rounded-full h-8 w-8 flex justify-center items-center ${item.hoverColor}`}
            >
              {item.icon}
            </a>
          ))}
        </div>
        <div className="flex items-center w-full text-white py-3 mt-4 lg:mt-8 mb-8">
          <div className="hidden sm:block">
            <AppIcon src={"/logos/favicon.svg"} />
          </div>
          <div className="divide-x divide-gray-800 flex items-center space-x-4">
            <p className="text-gray-300 leading-normal md:text-end text-sm sm::text-base pl-2 w-full">
              Copyright © 2023 Zillionstack Inc. All rights reserved.{" "}
            </p>
            <Link
              href={"/privacy"}
              className="hover:underline text-gray-300 text-sm pl-4"
            >
              Privacy
            </Link>
            <Link
              href={"/terms"}
              className="hover:underline text-gray-300 text-sm pl-4"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
