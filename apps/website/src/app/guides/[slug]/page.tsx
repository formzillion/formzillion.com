import React from "react";
import Example from "./Example";
import { startCase } from "lodash";
import Link from "next/link";
import AppsLogo from "@/app/integrations/[slug]/AppsLogo";

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const slugTitle = startCase(slug);

  return {
    title: `${slugTitle} - Formzillion`,
    alternates: {
      canonical: `https://formzillion.com/integrations/${slug}`,
    },
  };
}

export default function DynamicSection({
  params,
}: {
  params: { slug: string };
}) {
  const platformsData = [
    {
      slug: "wordpress",
      image: "/guides/wordpress.png",
      heading: "Wordpress",
      description: "A backend for your Wordpress forms",
      title: "Getting started with WordPress is simple",
    },
    {
      slug: "gatsby",
      image: "/guides/gatsby.png",
      heading: "Gatsby site",
      description: "Add a form to your Gatsby site",
      title: "Getting started with gatsby is simple",
    },
    {
      slug: "nextjs",
      image: "/guides/nextjs.png",
      heading: "Next.js",
      description: " A backend for your Next.js forms",
      title: "Getting started with Next.js is simple",
    },
    {
      slug: "webflow",
      image: "/guides/webflow.svg",
      heading: "Webflow",
      description: " A backend for your Webflow forms",
      title: "Getting started with Webflow is simple",
    },
  ];
  const staticData = [
    {
      title: "Start collecting submissions with Formzillion ",
      description:
        "<ul><li>Start collecting data in a matter of clicks.</li><li>Let formzillion take care of the servers, databases,and analytics </li><li>Set up any form in seconds.</li></ul>",
    },
  ];
  const pageContent = platformsData.find(
    (content) => content.slug === params.slug
  );
  if (!pageContent) {
    return <div>Invalid slug</div>;
  }
  return (
    <>
      <section className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
        <div className="relative flex flex-col justify-center content-center items-center rounded-md text-center mt-10">
          <div className="w-full h-full flex flex-col pb-20 px-10 justify-center items-center ">
            <div className="p-3 flex items-center justify-center space-x-2">
              <Link href="/guides">
                <p className="text-base text-yellow-600">Guides</p>
              </Link>
              <p className="text-gray-400">/</p>
              <p className="text-base text-gray-400">
                {startCase(pageContent.slug)}
              </p>
            </div>
            <div className="">
              <AppsLogo pageContent={pageContent} />
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal">
                Add a form to your{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {pageContent.heading}
                </span>
              </h1>
              <div className="flex flex-row justify-center mt-10">
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer inline-flex rounded text-center text-sm px-4 py-2 leading-none text-white bg-orange-600 hover:bg-orange-700 mt-4 lg:mt-0   h-[40px] ml-2 items-center content-center justify-center"
                >
                  Try Formzillion its free
                </a>
                <a
                  href={`${process.env.NEXT_PUBLIC_DOCS_URL}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-orange-600 px-4 py-2 text-sm hover:text-white hover:bg-orange-600 text-orange-600 ml-8"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className=" font-medium leading-normal p-10 bg-gray-400/10 rounded-xl grid grid-cols-6">
          <div className="col-span-5 flex  flex-col">
            <h1 className="title-font text-xl sm:text-3xl mb-4 text-white font-normal ">
              {pageContent?.title}
            </h1>
            {staticData.map((data, index) => (
              <div key={index} className="leading-8 mt-4 font-normal">
                <ul className="list-disc space-y-3 pl-7">
                  <li>Start collecting data in a matter of clicks.</li>
                  <li>
                    Let formzillion take care of the servers, databases,and
                    analytics{" "}
                  </li>
                  <li>Set up any form in seconds.</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="border-b border-gray-800 border-dashed my-10 mx-auto max-w-5xl"></div>
      <Example slug={params.slug} />
    </>
  );
}
