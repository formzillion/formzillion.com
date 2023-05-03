import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import MenuItem, { MenuItemProps } from "./MenuItem";

interface MenuProps {
  menuItems?: MenuItemProps[];
  title: string;
  icon?: React.ReactElement;
}

export default function MenuCard(props: MenuProps) {
  const { menuItems, title, icon } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
        <Menu.Items className="absolute right-0 mt-1 w-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems?.map((item: any, index: number) => (
            <MenuItem
              key={index}
              text={item.text}
              disabled={item.disabled}
              icon={item.icon}
            />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
