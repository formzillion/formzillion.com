"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const path = usePathname();
  const pathname = path?.split("/")[1];
  const navigation = [
    { name: "General", href: `/${pathname}/settings` },
    { name: "Billing", href: `/${pathname}/settings/billing` },
    { name: "Invoices", href: `/${pathname}/settings/invoices` },
    { name: "Teams", href: `/${pathname}/settings/teams` },
    { name: "Tokens", href: `/${pathname}/settings/tokens` },
    { name: "Password", href: `/${pathname}/settings/password` },
  ];

  return (
    <nav className="w-40" aria-label="Sidebar">
      <ul role="list" className="space-y-1 w-40">
        {navigation.map((item) => (
          <li
            key={item.name}
            className="hover:bg-slate-100 hover:text-gray-600 transition-all rounded dark:hover:bg-gray-900"
          >
            <Link
              href={item.href}
              className={classNames(
                path === item.href
                  ? " dark:text-white text-gray-900 font-medium bg-slate-100 rounded dark:bg-gray-900 dark:hover:bg-gray-900 "
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:hover:bg-gray-900 hover:rounded-md",
                "group flex gap-x-3 p-2 pl-3 text-sm leading-6"
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
