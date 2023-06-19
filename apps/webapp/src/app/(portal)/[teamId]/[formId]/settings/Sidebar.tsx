"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const path = usePathname();
  const teamSlug = path?.split("/")[1];
  const formId = path?.split("/")[2];

  const navigation = [
    { name: "General", href: `/${teamSlug}/${formId}/settings` },
    {
      name: "Spam Filtering",
      href: `/${teamSlug}/${formId}/settings/spam-filter`,
    },
    {
      name: "Autoresponders",
      href: `/${teamSlug}/${formId}/settings/auto-responders`,
    },
    {
      name: "Email Notifications",
      href: `/${teamSlug}/${formId}/settings/email-notifications`,
    },
    {
      name: "Thank You Page",
      href: `/${teamSlug}/${formId}/settings/thank-you-page`,
    },
  ];

  return (
    <div>
      <nav aria-label="Sidebar" className="w-full sm:w-40 ">
        <ul role="list" className="space-y-1  w-full sm:w-40">
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
    </div>
  );
}
