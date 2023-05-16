import React from "react";
import AppIcon from "@/ui/AppIcon";

export default function CTASection() {
  return (
    <div className="mx-auto max-w-7xl flex flex-col items-center text-center p-10 text-white">
      <div className="space-y-4 pb-4">
        <h3 className="text-2xl sm:text-3xl lg:text-5xl">
          Manage you forms with Formzillion
        </h3>
        <p className="text-base sm:text-lg text-center leading-relaxed">
          Our options are suitable for individuals, small or large teams, and
          enterprises. <br /> Please feel free to contact us if you have any
          inquiries.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 my-8 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 text-gray-950 flex flex-col items-center text-center">
          <h6 className="text-2xl font-semibold flex items-end space-x-2">
            <AppIcon src="/logos/favicon.svg" /> Formzillion{" "}
            <span className="text-xl font-normal">Cloud</span>
          </h6>
          <p className="text-base mt-4">
            The fastest way to organize and manage your forms
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-transparent border-dashed border-2 border-gray-700 font-semibold rounded-md py-2.5 px-6 mt-6 cursor-pointer w-fit">
              Get started for free
            </div>
          </a>
        </div>
        <div className="bg-gray-900/40 rounded-2xl p-8 flex flex-col items-center text-center ">
          <h6 className="text-2xl font-semibold flex items-end space-x-2">
            <AppIcon src="/logos/favicon.svg" /> Formzillion{" "}
            <span className="text-xl font-extralight">Self-hosted</span>
          </h6>
          <p className="text-base font-light mt-4">
            The optimal solution for teams that want absolute control of their
            forms data.
          </p>
          <a
            href="https://docs.formzillion.com/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-transparent border-dashed border-2 border-gray-700 font-semibold rounded-md py-2.5 px-6 mt-6 cursor-pointer w-fit">
              Read Docs
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
