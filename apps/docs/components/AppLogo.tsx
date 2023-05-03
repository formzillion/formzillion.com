/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function AppLogo({ href = "/", className }: any) {
  return (
    <img
      src={"/logos/fz_logo_full.svg"}
      alt="Formzillion Logo"
      className="nx-h-8 nx-w-auto nx-object-contain"
    />
  );
}
