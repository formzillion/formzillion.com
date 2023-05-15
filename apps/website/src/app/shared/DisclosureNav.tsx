"use client";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  BanknotesIcon,
  BookOpenIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const navigation = [
  {
    name: "Docs",
    href: "https://docs.formzillion.com",
    current: true,
    icon: <BookOpenIcon className="inline h-4 w-4 text-gray-300" />,
  },
  {
    name: "Pricing",
    href: "/pricing",
    current: true,
    icon: <BanknotesIcon className="inline h-4 w-4 text-gray-300" />,
  },
  {
    name: "Login",
    href: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    current: true,
    icon: <UserCircleIcon className="inline h-4 w-4 text-gray-300" />,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function DisclosureNav() {
  return (
    <Disclosure
      as="header"
      className="shadow text-white sticky z-[200] top-0 sm:hidden bg-gradient-to-r from-black via-gray-950 to-black"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2">
            <div className="relative flex h-16 justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="block w-8 h-8">
                  <Image
                    src={"/logos/favicon.svg"}
                    alt="Formzillion Logo"
                    className="w-full h-full object-contain"
                    width={10}
                    height={10}
                  />
                </div>
              </div>
              <div className="relative z-10 flex space-x-2 items-center">
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
                  className="bg-orange-600 text-orange-50 px-3 py-1 text-sm rounded hover:bg-orange-700"
                >
                  Sign up
                </a>
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-950 focus:bg-gray-950 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-800">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel
            as="nav"
            className="shadow dark:border-b dark:border-gray-950"
            aria-label="Global"
          >
            <div className="border-t border-gray-900"></div>
            <div className="space-y-1 px-2 pb-3 pt-2 shadow shadow-gray-950">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "hover:bg-gray-950 text-gray-200"
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-900",
                    "py-2 px-3 text-sm font-medium gap-x-1 flex items-center"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.icon}
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
