import React from "react";
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import classNames from "classnames";
import { useSelectedLayoutSegment } from "next/navigation";

const subNavigation = [
  {
    name: "Account",
    href: "/account",
    icon: UserCircleIcon,
    targetSegment: null,
  },
  {
    name: "Password",
    href: "/account/password",
    icon: KeyIcon,
    targetSegment: "password",
  },
  {
    name: "Team",
    href: "/account/team",
    icon: UsersIcon,
    targetSegment: "team",
  },
  {
    name: "Billing",
    href: "/account/billing",
    icon: CreditCardIcon,
    targetSegment: "billing",
  },
];

export default function AccountSidebar() {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <aside className="fixed top-6 left-0 mt-8 min-h-screen w-72 space-y-4 border-r bg-white py-4 pt-10">
      <nav className="space-y-1">
        {subNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              activeSegment === item.targetSegment
                ? "border-orange-500 bg-orange-50 text-orange-700 hover:bg-orange-50 hover:text-orange-700"
                : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
              "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
            )}
            aria-current={
              activeSegment === item.targetSegment ? "page" : undefined
            }
          >
            <item.icon
              className={classNames(
                activeSegment === item.targetSegment
                  ? "text-orange-500 group-hover:text-orange-500"
                  : "text-gray-400 group-hover:text-gray-500",
                "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
