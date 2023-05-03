import Link from "next/link";
import Image from "next/image";
import React from "react";
import Typewriter from "typewriter-effect";
import HeroImage from "./HeroImage";

export default function HeroSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="container mx-auto flex flex-col items-center gap-5 px-5 py-8 md:flex-row lg:items-start lg:gap-0 lg:p-10 lg:py-20">
          <div className="w-full space-y-6 md:w-1/2 md:space-y-8">            
            <h1 className="text-3xl leading-relaxed lg:text-5xl lg:leading-relaxed text-gray-700 pt-20">
              Instant backend for your forms.
            </h1>
            <div className="text-base leading-snug text-gray-500 md:text-lg space-y-4">
              <p>
                Just focus on how the form looks and what information you need. We will take care of the rest.
              </p>
            </div>
            <div className="flex flex-row space-x-4">
              <Link
                className="flex items-center justify-center rounded-lg bg-orange-600 text-white p-1 text-center font-semibold transition duration-200 ease-in-out hover:bg-orange-700 sm:px-4 sm:py-3"
                href="https://rkq53epk2c1.typeform.com/to/oflWmqo6"                
              >
                Request Access
              </Link>
            </div>
          </div>          
          <div className="hidden md:block w-1/2">
            <HeroImage/>
          </div>
        </div>
      </div>
    </div>
  );
}
