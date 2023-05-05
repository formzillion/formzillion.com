import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import MenuItem, { MenuItemProps } from "./MenuItem";

interface MenuProps {
  menuItems?: MenuItemProps[];
  title: string;
  icon?: React.ReactElement;
  onClick?: MouseEvent | any;
}

export default function MenuCard(props: MenuProps) {
  const { menuItems, title, icon } = props;

  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-gray-700 dark:text-gray-400 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {title ? title : ""}
          {icon ? icon : ""}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute min-w-[100px] right-0 mt-1 origin-top-right divide-y divide-gray-100 dark:divide-gray-600 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-950">
          {menuItems?.map((item: any, index: number) => (
            <MenuItem
              key={index}
              text={item.text}
              disabled={item.disabled}
              icon={item.icon}
              onClick={item.onClick}
              link={item.link}
            />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
