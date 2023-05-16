import React from "react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

interface IconProps {
  src: string;
  href?: string;
  className?: string;
}

export default function AppIcon(props: IconProps) {
  const { src, href, className } = props;

  return href ? (
    <Link href={href? href : "/"} className={clsx("flex", className)}>
      <Image
        src={src}
        alt="Formzillion Logo"
        className="w-auto h-7 object-contain"
        height={10}
        width={10}
      />
    </Link>
  ) : (
    <Image
      src={src}
      alt="Formzillion Logo"
      className="w-auto h-7 object-contain"
      height={10}
      width={10}
    />
  );
}
