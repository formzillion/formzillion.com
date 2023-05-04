import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Logo from "../../public/logos/logo.png";

export default function AppLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={clsx("flex", className)}>
      <Image
        src={Logo}
        alt="Formzillion Logo"
        className="w-auto h-10 object-contain"
      />
    </div>
  );
}
