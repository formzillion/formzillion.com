import Link from "next/link";
import Image from "next/image";
import React from "react";
import Typewriter from "typewriter-effect";

export default function HeroSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="container mx-auto flex flex-col items-center gap-5 px-5 py-8 md:flex-row lg:items-start lg:gap-0 lg:p-10 lg:py-20">
          <div className="w-full space-y-6 md:w-1/2 md:space-y-8">
            <h1 className="text-3xl leading-relaxed lg:text-5xl lg:leading-relaxed text-gray-700">
              <div className="flex">
                <span className="mr-2">Connect forms to </span>
                <Typewriter
                  options={{
                    strings: ["Email", "Website", "Portfolio", "Blog"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </h1>
            <div className="text-base leading-snug text-gray-500 md:text-lg space-y-4">
              <p>
                Collect form submissions, receive leads to CRM and automate your
                form.
              </p>
              <p>
                Tailored solutions made for agencies, freelancers, developers
                and marketing teams
              </p>
            </div>
            <div className="flex flex-row space-x-4">
              <Link
                className="flex items-center justify-center rounded-lg bg-orange-600 text-white p-1 text-center font-semibold transition duration-200 ease-in-out hover:bg-orange-700 sm:px-4 sm:py-3"
                href="/login"
              >
                Generate Endpoint Now
              </Link>
            </div>
          </div>
          <div className="hidden md:block lg:w-1/2">
          </div>
        </div>
      </div>
    </div>
  );
}
