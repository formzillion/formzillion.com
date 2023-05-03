/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Avatar({ src, alt = "avatar" }: any) {
  return (
    <img className="inline-block h-8 w-8 rounded-full" src={src} alt={alt} />
  );
}
