/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

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
        src={"/logos/fz_logo_full.svg"}
        alt="Formzillion Logo"
        className="w-auto h-7 object-contain"
        height={10}
        width={10}
      />
    </Link>
  );
}
