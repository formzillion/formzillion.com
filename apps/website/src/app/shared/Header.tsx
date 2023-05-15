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
      <div className="mx-auto max-w-7xl flex justify-between py-2 h-[60px]">
        <div className="flex items-center space-x-8">
          <div>
            <AppLogo />
          </div>
          <div className="flex items-end space-x-6 text-base">
            <NavLink url={"https://docs.formzillion.com"} title={"Docs"} />
          </div>
        </div>
        <GithubStar />
        <div className="flex items-center space-x-4">
          <NavLink url={"/pricing"} title={"Pricing"} />
          <div className="border-r py-4 border-gray-800"></div>
          <NavLink
            url={`${process.env.NEXT_PUBLIC_APP_URL}/login`}
            title={"Login"}
          />
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
            className="bg-orange-600 text-orange-50 px-6 py-2 rounded hover:bg-orange-700"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
