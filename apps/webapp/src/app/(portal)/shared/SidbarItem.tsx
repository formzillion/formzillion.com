import React from "react";
import classNames from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function SidbarItem({ item }: any) {
  const segment: any = useSelectedLayoutSegment();

  return (
    <Link
      key={item.name}
      href={item.href}
      className={classNames(
        item.href.includes(segment)
          ? "bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-300"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
      )}
      aria-current={item.href.includes(segment) ? "page" : undefined}
    >
      <item.icon
        className={classNames(
          item.href.includes(segment)
            ? "text-gray-500"
            : "text-gray-400 group-hover:text-gray-500",
          "mr-3 h-6 w-6 flex-shrink-0"
        )}
        aria-hidden="true"
      />
      {item.name}
    </Link>
  );
}
