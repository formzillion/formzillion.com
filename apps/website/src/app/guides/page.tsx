import React from "react";
import Link from "next/link";
import Image from "next/image";

import { platforms } from "./content";

export default function page() {
  return (
    <div className="container py-10 max-w-7xl ">
      <div className="my-4 space-y-4 text-center w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal sm:px-20">
          Formzillion with Any{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Technology Stack
          </span>
        </h1>
        <p className="text-base lg:text-xl text-center font-light text-gray-300 mx-auto max-w-3xl">
          Explore the following written guides to learn how to effectively
          employ Formzillion with various frameworks.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 place-content-center justify-center sm:px-16">
        {platforms.map((app: any, idx: number) => (
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
