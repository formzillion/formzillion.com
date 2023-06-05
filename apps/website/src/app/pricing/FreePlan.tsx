import Button from "@/ui/Buttons";
import { CheckIcon } from "@heroicons/react/24/solid";
import React from "react";

const features = [
  "1 Form creation",
  "Default thank-you page redirection",
  "Up to 100 submissions",
  "Community support via slack.",
];
export default function FreePlan() {
  return (
    <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto py-8 lg:py-16">
      <div className="p-10 bg-gray-400/10 flex flex-col-reverse items-center md:grid md:grid-cols-5  rounded-xl">
        <div className="space-y-5 md:col-span-3 flex justify-center flex-col">
          {features.map((feature) => (
            <div className="flex space-x-3">
              <CheckIcon
                className=" h-5 w-5 text-orange-600"
                aria-hidden="true"
              />
              <p>{feature}</p>
            </div>
          ))}
        </div>
        <div className="text-center mb-5 md:mb-0 md:col-span-2">
          <p className="text-lg text-gray-400 mb-2">
            <span className="text-8xl text-orange-600">$0</span>/month
          </p>
          <p className="text-gray-500 text-sm">
            Ideal for enthusiasts and budding entrepreneurs. Benefit from a
            supportive community.
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
            className={
              "bg-orange-600 text-white hover:bg-orange-700 ring-inset ring-orange-200 hover:ring-orange-300 mt-8 block rounded-md py-2 px-3 text-center text-sm leading-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            }
          >
            Try Formzillion - Its Free
          </a>
        </div>
      </div>
    </div>
  );
}
