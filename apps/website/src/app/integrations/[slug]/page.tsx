import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BoltIcon,
  CursorArrowRaysIcon,
  PlusCircleIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

import HowToConnect from "./HowToConnect";

export default function page() {
  return (
    <div className="container max-w-5xl mt-16">
      <div className="rounded bg-gray-900/50 py-6 px-10">
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
              src="/brands/slack.png"
              alt="app-logo"
              height={80}
              width={80}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="text-center">
          <h4 className="text-2xl sm:text-3xl lg:text-5xl font-normal bg-gradient-to-r from-yellow-400 via-orange-600 to-orange-800 bg-clip-text text-transparent">
            Slack
          </h4>
          <p className="text-lg mt-4">
            Seamlessly integrate Slack with your daily apps on Formzillion,
            empowering team collaboration for faster goal achievement. With zero
            code integration, automate message notifications to specific
            channels, enabling your sales team to close deals more efficiently.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 items-center justify-center relative">
          <div className="space-y-6">
            <p className="flex">
              <Square3Stack3DIcon className="inline w-8 h-8 mr-1 text-orange-500" />
              Stay structured — Publish fresh form submissions to designated
              public or private Slack channels.
            </p>

            <p className="flex">
              <BoltIcon className="inline w-8 h-8 mr-1 text-orange-500" />
              Real-time notifications — Gain instant access to form submission
              data, enabling your team to respond swiftly.
            </p>

            <p className="flex">
              <CursorArrowRaysIcon className="inline w-8 h-8 mr-1 text-orange-500" />
              Easy configuration — Establish a direct connection to your Slack
              workspace with just a few clicks.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
              className="mt-0 flex items-center justify-center rounded bg-orange-600 py-2 px-4 text-white hover:bg-orange-700"
            >
              Get Started for free
            </Link>
            <p>No Credit card required</p>
          </div>
        </div>
      </div>
      <HowToConnect />
    </div>
  );
}
