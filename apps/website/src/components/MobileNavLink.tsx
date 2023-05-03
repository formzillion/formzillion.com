"use client";
import { Popover } from "@headlessui/react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const MobileNavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
};

export default MobileNavLink;
