import React from "react";
import Link from "next/link";
import { startCase } from "lodash";

export default function HeroSection({ slug }: any) {
  return (
    <div className="w-full min-h-[400px] bg-gray-400/5 flex justify-center items-center">
      <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto ">
        <div className="mb-5 text-center space-y-5 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl mb-2 font-normal lg:leading-snug">
            Looking for{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              open source alternative
            </span>{" "}
            for {startCase(slug)}
          </h1>
          <p className="text-base lg:text-xl text-gray-400">
            {
              "Are you looking for open source solution where you have full control application"
            }
          </p>
          <div className="flex justify-center w-full">
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/login`}
              className="mt-0 flex h-[44px] w-fit items-center justify-center rounded bg-orange-600 py-2.5 px-4 text-white hover:bg-orange-700"
            >
              {`Try Formzillion - It's free!`}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
