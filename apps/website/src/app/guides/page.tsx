import React from "react";
import { Metadata } from "next";

import GuidesCategory from "./GuidesCategory";

export const metadata: Metadata = {
  title: "Guides - Formzillion",
  description:
    "Utilize our installation guides to acquire the necessary knowledge on seamlessly integrating our forms into your website or application",
  alternates: {
    canonical: "https://formzillion.com/guides",
  },
};

export default function page() {
  return (
    <div className="container py-10 max-w-7xl ">
      <div className="my-4 space-y-4 text-center w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal sm:px-20">
          Formzillion with any{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            technology stack
          </span>
        </h1>
        <p className="text-base lg:text-xl text-center font-light text-gray-300 mx-auto max-w-3xl">
          Explore the following written guides to learn how to effectively
          employ Formzillion with various frameworks.
        </p>
      </div>
      <GuidesCategory  />
    </div>
  );
}
