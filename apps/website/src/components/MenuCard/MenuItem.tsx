import { Menu } from "@headlessui/react";

export interface MenuItemProps {
  text: string;
  icon?: React.ReactElement;
  onClick?: React.MouseEvent;
  disabled?: boolean;
}
export default function MenuItem(props: MenuItemProps) {
  const { text, icon, onClick, disabled } = props;

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? "bg-gray-100 dark:text-gray-900" : "dark:text-gray-900"
          } group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2 transition ease-in-out duration-200 font-semibold`}
          disabled={disabled}
        >
          {icon}
          <span>{text}</span>
        </button>
      )}
    </Menu.Item>
  );
}
