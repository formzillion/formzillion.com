import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import HowToConnect from "./HowToConnect";
import AppsLogo from "./AppsLogo";
import { heroSection } from "./content/heroSection";
import { startCase } from "lodash";

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const slugTitle = startCase(slug);

  return {
    title: `${slugTitle} Integration - Formzillion`,
    description: `Integrate ${slugTitle} with Formzillion Forms.`,
    alternates: {
      canonical: `https://formzillion.com/integrations/${slug}`,
    },
  };
}

export default function page({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const pageContent = heroSection.find((content: any) => content.slug === slug);

  return (
    <div className="container max-w-5xl mt-10">
      <AppsLogo pageContent={pageContent} />
      <div className="text-center">
        <h4 className="text-2xl sm:text-3xl lg:text-5xl font-normal">
          Formzillion with{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            {pageContent?.title}{" "}
          </span>
        </h4>
        <p className="text-lg mt-4 text-gray-400">{pageContent?.description}</p>
      </div>
      <div className="flex justify-center space-x-4 items-center mt-4">
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
          className="mt-0 flex items-center justify-center rounded bg-orange-600 py-2 px-4 text-white hover:bg-orange-700"
        >
          Get Started for free
        </Link>
        <Link
          href={pageContent?.docsLink}
          className="mt-0 flex items-center justify-center rounded border border-gray-400 py-2 px-4 hover:text-orange-600"
        >
          Learn more
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-12 items-center">
        <div className="space-y-6">
          {pageContent?.steps.map((step: any) => (
            <div className="flex items-center space-x-2 ">
              {step.icon}
              <p className="w-[90%] text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
        <video
          className="relative z-50 bg-black w-full border-2 border-gray-600 rounded-xl p-3 max-w-4xl"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={`/integrations/${pageContent?.videoUrl}`}
            type="video/mp4"
          />
        </video>
      </div>
      <div className="flex justify-center items-center mt-8">
        <Link href="/integrations">
          <p className="text-base text-orange-500 hover:text-orange-600">
            <ArrowLeftIcon className="inline w-5 h-4 mr-1" />
            All Integrations
          </p>
        </Link>
      </div>
      <div className="border-b border-gray-800 border-dashed my-10"></div>
      <HowToConnect slug={slug} />
    </div>
  );
}
