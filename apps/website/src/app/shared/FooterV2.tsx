import Link from "next/link";
import AppLogo from "@/ui/AppLogo";
import Image from "next/image";
import BlurDotGridBottom from "../home/WaitlistHeroSection/BlurDotGridBottom";
import github from "public/logos/github.jpeg";

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
    href: "/roadmap",
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

export default function Footer() {
  return (
    <div className="relative">
      <BlurDotGridBottom />
      <div className="relative z-50 gap-8 flex flex-row flex-wrap text-start text-white max-w-5xl mx-auto pt-10 pb-2 px-8">
        <div className={`flex flex-col items-start font-['Satoshi']`}>
          <div className="gap-5 flex flex-col">
            <p className="text-md font-bold leading-normal underline">
              Product
            </p>
            <div className="gap-4 flex flex-col font-normal text-md leading-normal">
              {ProductItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className={`flex flex-col items-start font-['Satoshi']`}>
          <div className="gap-5 flex flex-col">
            <p className="text-md font-bold leading-normal underline">
              Company
            </p>
            <div className="gap-4 flex flex-col font-normal text-md leading-normal">
              {CompanyItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex flex-col items-start font-['Satoshi']`}>
          <div className="gap-5 flex flex-col">
            <p className="text-md font-bold leading-normal underline">
              Platforms
            </p>
            <div className="gap-4 flex flex-col font-normal text-md leading-normal">
              {PlatformItem.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex flex-col items-start font-['Satoshi']`}>
          <div className="gap-5 flex flex-col">
            <p className="text-md font-bold leading-normal underline">
              Features
            </p>
            <div className="gap-4 flex flex-col font-normal text-md leading-normal">
              {FeaturesItem.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col grow items-center md:items-end">
          <AppLogo />
          <div
            className={`gap-6 pt-0 pl-0 flex flex-col font-medium font-['Satoshi'] mt-5`}
          >
            <div className="gap-6 flex flex-col text-end">
              <p className="text-md leading-normal">
                1511-35 Hayden Street,
                <br />
                Toronto, Ontario, Canada.
              </p>
              <p className="text-md leading-normal">
                +1 (587) 988-9633
                <br />
                support@formzillion.com
              </p>
            </div>
          </div>
        </div>
        <div className="sm:flex justify-between w-full text-white p-3 pb-0">
          <div>
            <a
              href="https://github.com/formzillion"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={github}
                alt="github"
                className=" ml-2 h-10 w-10 object-center rounded bg:none dark:bg-none hover:bg-gray-600"
              />
            </a>
          </div>
          <p className="text-md leading-normal text-end">
            Copyright © 2023 Zillionstack Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
