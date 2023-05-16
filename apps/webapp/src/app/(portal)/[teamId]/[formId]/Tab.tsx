"use client";
import classNames from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export function Tab({ name, href, targetSegment }: any) {
  const activeSegment = useSelectedLayoutSegment();
  const isActive = activeSegment === targetSegment ? true : false;

  return (
    <Link
      key={name}
      href={href}
      className={classNames(
        isActive
          ? "border-orange-500 text-orange-600"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500",
        "group inline-flex items-center border-b-2 py-2 px-1 text-sm font-medium"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="text-sm">{name}</span>
    </Link>
  );
}
