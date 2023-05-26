import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import { apps } from "./apps";

export const metadata: Metadata = {
  title: "Integrations - Formzillion",
  description:
    "Leverage our direct integrations and API to effortlessly route your form submission data to its designated destination. ",
  alternates: {
    canonical: "https://formzillion.com/integrations",
  },
};

export default function Integrations() {
  return (
    <div className="container py-10 max-w-7xl flex flex-col justify-center">
      <div className="my-4 space-y-4 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal sm:px-20">
          The Formzillion{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Integrations
          </span>
        </h1>
        <p className="text-base lg:text-xl leading-normal font-light text-gray-300">
          Formzillion offers extensive and powerful integration capabilities.
          Explore our current supported integrations
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 place-content-center justify-center sm:px-16">
        {apps.map((app: any, idx: number) => (
          <Link href={app.url} key={idx}>
            <div className="rounded bg-gray-900/20 border border-gray-900 hover:border-gray-700 flex flex-col items-center py-8 space-y-4">
              <div className="h-16 w-16">
                <Image
                  src={app.image}
                  alt={app.name}
                  height={80}
                  width={80}
                  className="object-contain"
                />
              </div>
              <p className="text-2xl">{app.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
