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
    { name: "Members", href: `/${pathname}/settings/members` },
    { name: "Billing", href: `/${pathname}/settings/billing` },
    { name: "Invoices", href: `/${pathname}/settings/invoices` },
  ];

  return (
    <nav className="flex m-8 flex-1 flex-col" aria-label="Sidebar">
      <ul role="list" className="-mx-2 space-y-1 w-40">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={classNames(
                path === item.href
                  ? " dark:text-white text-gray-900"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:hover:bg-gray-900 hover:rounded-md",
                "group flex gap-x-3 p-2 pl-3 text-sm leading-6 font-semibold"
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
