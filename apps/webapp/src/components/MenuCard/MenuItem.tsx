import { Menu } from "@headlessui/react";
import Link from "next/link";

export interface MenuItemProps {
  text: string;
  icon?: React.ReactElement;
  onClick?: React.MouseEvent | any;
  disabled?: boolean;
  link?: string;
}
export default function MenuItem(props: MenuItemProps) {
  const { text, icon, onClick, disabled, link } = props;

  return (
    <Menu.Item>
      {({ active }) =>
        link ? (
          <Link
            href={link}
            className={`${
              active
                ? "bg-gray-100 text-gray-500 dark:text-gray-500"
                : "dark:text-gray-400"
            } group flex w-[125px] text-gray-500 rounded-md px-2 py-2 text-sm space-x-2 transition ease-in-out duration-200 dark:bg-gray-950`}
          >
            {text}
          </Link>
        ) : (
          <button
            className={`${
              active
                ? "bg-gray-100 text-gray-500 dark:text-gray-600"
                : "dark:text-gray-400"
            } group flex w-[125px] text-gray-500 rounded-md px-2 py-2 text-sm space-x-2 transition ease-in-out duration-200 dark:bg-gray-900`}
            disabled={disabled}
            onClick={onClick}
          >
            {icon ? <div>{icon}</div> : ""}
            <div>{text}</div>
          </button>
        )
      }
    </Menu.Item>
  );
}
