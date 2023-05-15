import Link from "next/link";
import AppLogo from "@/ui/AppLogo";
import { FiGithub, FiLinkedin, FiSlack } from "react-icons/fi";
import BlurDotGridBottom from "../home/WaitlistHeroSection/BlurDotGridBottom";

const ProductItems = [
  {
    label: "Templates",
    href: "/templates",
  },
  {
    label: "Documentation",
    href: "https://docs.formzillion.com",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Status",
    href: "/status",
  },
  {
    label: "Changelog",
    href: "/changelog",
  },
  {
    label: "Security",
    href: "/security",
  },
  {
    label: "Contact Sales",
    href: "/contact-us",
  },
  {
    label: "Contact Support",
    href: "/contact-us",
  },
];

const CompanyItems = [
  {
    label: "Blog",
    href: "https://blog.formzillion.com",
  },
  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "Roadmap",
    href: "https://github.com/orgs/formzillion/projects/1",
  },
  {
    label: "Terms",
    href: "/policies/tos",
  },
  {
    label: "Privacy",
    href: "/policies/privacy",
  },
  {
    label: "Announcements",
    href: "/announcements",
  },
];

const FeaturesItem = [
  {
    label: "Spam Filtering",
    href: "/features/spam-filtering",
  },
];

const PlatformItem = [
  {
    label: "Wordpress",
    href: "/for/wordpress",
  },
  {
    label: "Gatsby",
    href: "/for/gatsby",
  },
  {
    label: "Nextjs",
    href: "/for/nextjs",
  },
  {
    label: "Webflow",
    href: "/for/webflow",
  },
];

const FooterIcons = [
  {
    icon: <FiLinkedin className="text-gray-400 hover:text-blue-600" />,
    url: "https://www.linkedin.com/company/formzillion/",
  },
  {
    icon: <FiGithub className="text-gray-400 hover:text-white" />,
    url: "https://github.com/formzillion",
  },
  {
    icon: <FiSlack className="text-gray-400 hover:text-purple-900" />,
    url: "https://formzillion.slack.com/join/shared_invite/zt-1urntbbmb-o0d6Qzdl~GzfePoZE7JTYw",
  },
];

export default function Footer() {
  return (
    <div className="relative border-t border-gray-950">
      <BlurDotGridBottom />
      <div className="grid grid-cols-3 mx-auto max-w-6xl mt-8 text-white px-3">
        <div className="col-span-3 md:col-span-1">
          <AppLogo />
          <div className="text-sm lg:text-base mt-3 ">
            <p className="leading-normal ">
              1511-35 Hayden Street,
              <br />
              Toronto, Ontario, Canada.
            </p>
            <br />
            <p className="leading-normal">
              <a href="tel:+1 (587) 988-9633">+1 (587) 988-9633</a>
              <br />
              <a href="mailto:support@formzillion.com">
                support@formzillion.com
              </a>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 col-span-3 md:col-span-2 mt-8 md:mt-0 relative">
          <div>
            <p className="text-md font-bold leading-normal underline">
              Product
            </p>
            <div className="gap-4 flex flex-col font-normal text-md leading-normal mt-3">
              {ProductItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-md font-bold leading-normal underline">
              Company
            </p>
            <div className="gap-4 flex flex-col font-normal text-md leading-normal mt-3">
              {CompanyItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-md font-bold leading-normal underline mt-8 sm:mt-0">
              Platforms
            </p>
            <div className="gap-4 flex flex-col font-normal text-md leading-normal mt-3">
              {PlatformItem.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-md font-bold leading-normal underline mt-8 sm:mt-0">
              Features
            </p>
            <div className="gap-4 flex flex-col font-normal text-md leading-normal mt-3">
              {FeaturesItem.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex justify-between w-full text-white p-3 mx-auto max-w-6xl mt-8 mb-8">
        <div className="flex items-center space-x-2">
          {FooterIcons.map((item: any, idx: number) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-b from-gray-900 to-gray-950 rounded h-8 w-8 flex justify-center items-center"
            >
              {item.icon}
            </a>
          ))}
        </div>
        <p className="text-md leading-normal text-center md:text-end">
          Copyright © 2023 Zillionstack Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
