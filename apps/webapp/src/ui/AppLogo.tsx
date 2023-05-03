import React from "react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import Logo from "../../public/logos/logo.png";

export default function AppLogo({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={clsx("flex", className)}>
      <Image
        src={Logo}
        alt="Formzillion Logo"
        className="w-auto h-10 object-contain"
      />
    </Link>
  );
}
