import React from "react";
import Image from "next/image";
import Logo from "../../public/logos/logo.png";

export default function AppLogo() {
  return (
    <Image
      src={Logo}
      alt="Formzillion Logo"
      className="w-auto h-10 object-contain"
    />
  );
}
