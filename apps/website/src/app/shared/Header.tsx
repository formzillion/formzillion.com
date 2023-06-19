import React from "react";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  ChevronDownIcon,
  MapIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { FiSlack } from "react-icons/fi";

import AppLogo from "@/ui/AppLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import GithubStar from "./GithubStar";

interface navProps {
  url: string;
  title: string;
}
const NavLink = (props: navProps) => {
  const { url, title } = props;
  return (
    <Link
      href={url}
      className="py-5 border-b-2 border-transparent hover:border-orange-600 hover:text-orange-200"
    >
      {title}
    </Link>
  );
};

const MenuLink = (props: navProps) => {
  const { url, title } = props;
  return (
    <a
      href={url}
      rel="noreferrer"
      target="_blank"
      className="flex items-center"
    >
      {title}
      <ArrowTopRightOnSquareIcon className="ml-1 w-4 h-4" />
    </a>
  );
};

const MenuList = [
  {
    title: "Community Slack",
    url: "https://formzillion.slack.com/join/shared_invite/zt-1urntbbmb-o0d6Qzdl~GzfePoZE7JTYw",
    icon: <FiSlack className="h-4 w-4 mr-2 text-gray-500" />,
  },
  {
    title: "Roadmap",
    url: "https://github.com/orgs/formzillion/projects/1",
    icon: <MapIcon className="h-4 w-4 mr-2" />,
  },
  {
    title: "Setup Formzillion",
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/setup`,
    icon: <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />,
  },
  {
    title: "Features",
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/features`,
    icon: <BoltIcon className="h-4 w-4 mr-2" />,
  },
];

export default function Header() {
  return (
    <div className="shadow text-white sticky bg-gray-950 bg-opacity-70 backdrop-blur-2xl z-[200] top-0 lg:block hidden border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-2 xl:py-2.5 flex justify-between py-2 h-[60px] xl:h-[65px]">
        <div className="flex items-center space-x-8">
          <div>
            <AppLogo />
          </div>
          <NavLink url={"/pricing"} title={"Pricing"} />
          <NavLink url={"/integrations"} title={"Integrations"} />
          <NavLink url={"/guides"} title={"Guides"} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="border-0">
              <div className="py-5 border-b-2 border-transparent hover:border-orange-600 hover:text-orange-200 flex items-center">
                Resources
                <ChevronDownIcon className="ml-0.5 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {MenuList.map((item: any, idx: number) => (
                  <div key={idx}>
                    <DropdownMenuItem>
                      {item.icon}
                      <MenuLink url={item.url} title={item.title} />
                    </DropdownMenuItem>
                  </div>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}`}
            rel="noreferrer"
            target="_blank"
            className="flex items-center py-5 border-b-2 border-transparent hover:border-orange-600 hover:text-orange-200"
          >
            Docs
            <ArrowTopRightOnSquareIcon className="ml-1 w-4 h-4" />
          </a>
          <GithubStar />
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/login`}
            className="bg-orange-600 text-orange-50 px-4 py-1.5 rounded hover:bg-orange-700"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
