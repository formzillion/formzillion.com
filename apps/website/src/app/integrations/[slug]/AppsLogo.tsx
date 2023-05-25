import React from "react";
import Image from "next/image";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function AppsLogo({ pageContent }: any) {
  return (
    <div className="flex items-center justify-center my-4 space-x-4">
      <div className="h-16 w-16 bg-white rounded-full p-2 flex items-center justify-center">
        <Image
          src="/favicon.svg"
          alt="logo"
          height={40}
          width={40}
          className="object-contain w-15 w-15"
        />
      </div>
      <PlusCircleIcon className="inline w-8 h-8 mr-1" />
      <div className="h-16 w-16 bg-white rounded-full p-2">
        <Image
          src={pageContent?.image}
          alt="app-logo"
          height={80}
          width={80}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
