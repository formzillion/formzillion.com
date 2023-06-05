import {
  BookOpenIcon,
  BookmarkSquareIcon,
  ChevronRightIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const links = [
  {
    name: "Documentation",
    href: "https://docs.formzillion.com/",
    description:
      "Learn how to implement the features and functionalities of the Formzillion platform",
    icon: BookOpenIcon,
  },
  {
    name: "Integrations",
    href: "/integrations",
    description:
      "Formzillion offers extensive and powerful integration capabilities.",
    icon: PuzzlePieceIcon,
  },
  {
    name: "Guides",
    href: "/guides",
    description:
      "Learn how to effectively employ Formzillion with various frameworks..",
    icon: BookmarkSquareIcon,
  },
];

export default function NotFound() {
  return (
    <div className="bg-gray-950/10 mx-auto w-full max-w-7xl px-6 pt-10 lg:px-8 grid grid-cols-2 items-center">
      <div className="mx-auto  max-w-2xl text-center flex flex-col items-center">
        <Image src="/empty_forms.svg" alt="404" height={250} width={250} />
        <p className="text-5xl mt-6 leading-8 text-orange-600 font-bold">404</p>
        <h1 className="mt-4 text-3xl font-normal tracking-tight text-gray-200">
          This page does not exist
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-400 sm:mt-6 sm:text-lg sm:leading-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
        <ul role="list" className="-mt-6 divide-y divide-gray-800">
          {links.map((link, linkIdx) => (
            <li key={linkIdx} className="relative flex gap-x-6 py-6">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10">
                <link.icon
                  className="h-6 w-6 text-orange-600"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-auto">
                <h3 className="text-sm font-normal text-gray-300">
                  <a href={link.href}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {link.name}
                  </a>
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {link.description}
                </p>
              </div>
              <div className="flex-none self-center">
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <a
            href="/"
            className="text-sm font-semibold leading-6 text-orange-600"
          >
            <span aria-hidden="true">&larr;</span>
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
