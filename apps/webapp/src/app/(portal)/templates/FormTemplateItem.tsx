import React from "react";
import { getTimeAgo } from "@/utils/timeAgo";
import { EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function FormTemplateItem({ template }: any) {
  const { name, views, createdAt, author, id } = template;
  return (
    <Link
      href={`/templates/${id}`}
      className="block p-4 text-gray-500 hover:cursor-pointer"
    >
      <p className="text-lg font-medium">{name}</p>
      <div className="flex flex-row items-center space-x-4 divide-x-2">
        <div className="flex flex-row items-center space-x-1">
          <EyeIcon className="h-5 w-5 text-gray-500" />
          <span>{views}</span>
        </div>
        <div className="pl-2">{getTimeAgo(createdAt)}</div>
        <div className="pl-2">By {author}</div>
      </div>
    </Link>
  );
}
