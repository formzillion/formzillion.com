"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isEmpty, startCase } from "lodash";
import { Disclosure } from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import TeamSwitcher from "@/app/(portal)/shared/TeamSwitcher";
import { useSupabase } from "@/components/SupbaseProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { BreadcrumbSeparator } from "./Navbar";
import FormId from "../FormId";
import { ModeToggle } from "./ModeToggle";

const navigation = [
  { name: "Profile", href: "/account", current: true },
  { name: "Change Password", href: "/account/password", current: false },
];

const navigate = [
  { name: "Formzillion Homepage", href: "https://formzillion.com/" },
  {
    name: "Join our Slack",
    href: "https://formzillion.slack.com/join/shared_invite/zt-1urntbbmb-o0d6Qzdl~GzfePoZE7JTYw",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function DisclosureNav({ teams, user }: any) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const userName = user?.fullName;
  const userEmail = user?.email;
  const name = userEmail?.split("@")[0];
  const avatar = user?.avatar;

  const onClickLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <Disclosure as="header" className="bg-white dark:bg-black sm:hidden">
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
                <BreadcrumbSeparator />
                {/*Team Logo Section*/}
                <TeamSwitcher teams={teams} />
                <FormId />
              </div>
              <div className="relative z-10 flex items-center">
                {/* Mobile menu button */}
                <ModeToggle />
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-300 dark:focus:ring-gray-800">
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
            <div className="border-t border-gray-200 dark:border-gray-900 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  {isEmpty(avatar) ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://avatar.vercel.sh/user.png"
                        alt="User"
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatar} alt="User" />
                    </Avatar>
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-gray-400">
                    {isEmpty(userName) ? startCase(name) : userName}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {userEmail}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "hover:bg-gray-100 text-gray-900 dark:text-gray-400"
                      : "text-gray-900 dark:text-gray-400 hover:bg-gray-50 hover:text-gray-900",
                    "block rounded-md py-2 px-3 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {navigate.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="cursor-pointer dark:text-gray-400 text-gray-900 hover:bg-gray-50 hover:text-gray-900 flex items-center rounded-md py-2 px-3 text-sm font-medium"
                >
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.name}
                    <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
                  </a>
                </div>
              ))}
              <div
                onClick={onClickLogout}
                className="cursor-pointer dark:text-gray-400 text-gray-900 hover:bg-gray-50 hover:text-gray-900 block rounded-md py-2 px-3 text-sm font-medium"
              >
                Logout
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
