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
    { name: "General", href: `/${pathname}/team/settings` },
    { name: "Members", href: `/${pathname}/team/settings/members` },
    { name: "Billing", href: `/${pathname}/team/settings/billing` },
    { name: "Invoices", href: `/${pathname}/team/settings/invoices` },
  ];

  return (
    <div>
      <nav
        className="w-full sm:w-40 overflow-x-scroll sm:overflow-x-hidden"
        aria-label="Sidebar "
      >
        <ul
          role="list"
          className="space-x-1 sm:space-x-0 sm:space-y-1 flex sm:block w-full"
        >
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
                  "group flex gap-x-3 p-2 px-3 text-sm leading-6"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
