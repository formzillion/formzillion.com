import React from "react";

interface HeaderProps {
  title: string;
}
export default function Header(props: HeaderProps) {
  const { title } = props;
  return (
    <div className="py-4 w-full flex justify-between text-start  text-gray-900 dark:text-white text-lg font-bold">
      {title}
    </div>
  );
}
