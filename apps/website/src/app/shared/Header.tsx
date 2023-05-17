import React from "react";
import Link from "next/link";

import AppLogo from "@/ui/AppLogo";
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
      className="py-4 border-b-2 border-transparent hover:border-orange-600 hover:text-orange-200"
    >
      {title}
    </Link>
  );
};

export default function Header() {
  return (
    <div className="shadow text-white sticky bg-gray-950 bg-opacity-70 backdrop-blur-2xl z-[200] top-0 sm:block hidden border-b border-gray-800">
      <div className="mx-auto max-w-7xl xl:max-w-full px-4 xl:px-10 xl:py-2.5 flex justify-between py-2 h-[60px] xl:h-[65px]">
        <div className="flex items-center space-x-8">
          <div>
            <AppLogo />
          </div>
        </div>
        <GithubStar />
        <div className="flex items-center space-x-4">
          <NavLink url={"https://docs.formzillion.com"} title={"Docs"} />
          <div className="border-r py-4 border-gray-800"></div>
          <NavLink url={"/pricing"} title={"Pricing"} />
          <div className="border-r py-4 border-gray-800"></div>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}`}
            className="bg-orange-600 text-orange-50 px-4 py-1.5 rounded hover:bg-orange-700"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
