import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Breadcrumb({ currentName, currentHref }: any) {
  const pages = [
    { name: "Dashboard", href: "/forms" },
    { name: currentName, href: currentHref },
  ];

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              href="/forms"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-400"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page, idx) => (
          <li key={idx}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
