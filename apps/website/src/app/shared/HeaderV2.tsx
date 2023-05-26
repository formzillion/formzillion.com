"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { StarIcon } from "@heroicons/react/24/outline";

import AppLogo from "@/ui/AppLogo";
import Loader from "@/ui/Loader";

const headerItems = [
  {
    title: "Docs",
    href: `${process.env.NEXT_PUBLIC_DOCS_URL}`,
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
];

export default function ResponsiveHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [starCount, setStarCount] = useState(null);
  const url = "https://api.github.com/repos/formzillion/formzillion.com";

  useEffect(() => {
    async function fetchStarCount() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const count = data.stargazers_count;
        setStarCount(count);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStarCount();
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <nav className="flex items-center justify-between flex-wrap p-6 z-[100] mx-auto max-w-7xl w-full absolute top-0 left-0 right-0">
      <div className="flex items-center flex-no-shrink text-white mr-6">
        <AppLogo />
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-orange-600 hover:border-orange-600"
          onClick={toggleNav}
        >
          {!isNavOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
      <div
        className={clsx(
          !isNavOpen
            ? "hidden"
            : "block bg-black rounded-sm content-center items-center p-5 text-center",
          "w-full flex-grow lg:flex lg:items-center lg:w-auto"
        )}
      >
        <div className="text-sm flex items-center lg:flex-grow">
          {headerItems.map((item, index) => (
            <a
              href={item.href}
              className="block lg:inline-block text-white hover:text-orange-600 mr-4 font-[Satoshi]"
              key={index}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="flex mr-3">
          <a
            href="https://github.com/formzillion/formzillion.com"
            target="_blank"
            rel="noreferrer"
          >
            <p className="border border-gray-900 text-white px-4 py-2 flex gap-1 items-center bg-gray-950 hover:border-gray-500">
              <StarIcon className="h-5 w-5 inline" />
              Stars
            </p>
          </a>
          <a
            href="https://github.com/formzillion/formzillion.com/stargazers"
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            <p className="text-center py-2 px-4 hover:text-orange-400 text-white border border-gray-900 hover:border-gray-500">
              {starCount === null ? <Loader className="w-[15px]" /> : starCount}
            </p>
          </a>
        </div>
        <div className="flex flex-row justify-center">
          <a
            href={process.env.NEXT_PUBLIC_APP_URL}
            className="inline-flex text-center font-['Satoshi'] text-sm px-4 py-2 leading-none border text-white border-white hover:text-orange-600 mt-4 lg:mt-0 w-[80px] h-[40px] hover:border-orange-600 items-center justify-center"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}
