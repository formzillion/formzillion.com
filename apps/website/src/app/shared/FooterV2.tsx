import AppLogo from "@/ui/AppLogo";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiSlack } from "react-icons/fi";

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
        href: "https://docs.formzillion.com",
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
    title: "Platforms",
    list: [
      {
        label: "Wordpress",
        href: "/platforms/wordpress",
        target: "_self",
      },
      {
        label: "Gatsby",
        href: "/platforms/gatsby",
        target: "_self",
      },
      {
        label: "Nextjs",
        href: "/platforms/nextjs",
        target: "_self",
      },
      {
        label: "Webflow",
        href: "/platforms/webflow",
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
        href: "https://docs.formzillion.com/features/spam-filtering",
        target: "_blank",
      },
      {
        label: "Redirects",
        href: "https://docs.formzillion.com/features/redirects",
        target: "_blank",
      },
      {
        label: "Collaboration",
        href: "https://docs.formzillion.com/features/collaboration",
        target: "_blank",
      },
      {
        label: "Exports",
        href: "https://docs.formzillion.com/features/exports",
        target: "_blank",
      },
      {
        label: "Email Notifications",
        href: "https://docs.formzillion.com/features/email-notifications",
        target: "_blank",
      },
      {
        label: "Autoresponders",
        href: "https://docs.formzillion.com/features/autoresponders",
        target: "_blank",
      },
    ],
  },
  {
    title: "Features",
    list: [
      {
        label: "Formspree",
        href: "/features/formspree",
        target: "_self",
      },
      {
        label: "getform",
        href: "/features/getform",
        target: "_self",
      },
      {
        label: "Basin",
        href: "/features/basin",
        target: "_self",
      },
      {
        label: "Formspark",
        href: "/features/formspark",
        target: "_self",
      },
      {
        label: "Formcarry",
        href: "/features/formcarry",
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
        <div className="grid grid-cols-2 md:grid-cols-5 mt-8 text-white justify-between">
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
        <div className="flex flex-col items-center space-y-2 sm:flex-row justify-center sm:justify-between w-full text-white py-3 mt-4 lg:mt-8 mb-8">
          <AppLogo />
          <p className="text-gray-300 leading-normal md:text-end text-sm sm::text-base">
            Copyright © 2023 Zillionstack Inc. All rights reserved.
          </p>
          <div className="flex space-x-2">
            <Link href={"/privacy"} className="underline text-gray-300 text-sm">
              Privacy
            </Link>
            <Link href={"/terms"} className="underline text-gray-300 text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
