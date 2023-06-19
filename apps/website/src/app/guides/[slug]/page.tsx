import { startCase } from "lodash";
import Link from "next/link";

import AppsLogo from "@/app/integrations/[slug]/AppsLogo";
import "./steps/steps.css";
import { platformsData } from "./platformsData";
import NotFound from "@/app/not-found";

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const slugTitle = startCase(slug);

  return {
    title: `${slugTitle} - Formzillion`,
    description: `This guide will demonstrate the quick process of adding a contact form to your ${slugTitle} project and connecting it to Formzillion for submission handling.`,
    alternates: {
      canonical: `https://formzillion.com/guides/${slug}`,
    },
  };
}

export default function Banner({ params }: { params: { slug: string } }) {
  const pageContent = platformsData.find(
    (content) => content.slug === params?.slug
  );
  if (!pageContent) {
    return <NotFound />;
  }
  return (
    <>
      <section className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto ">
        <div className="mt-10 text-center">
          <div className="p-3 flex items-center justify-center space-x-2">
            <Link href="/guides">
              <p className="text-base text-yellow-600">Guides</p>
            </Link>
            <p className="text-gray-400">/</p>
            <p className="text-base text-gray-400">
              {startCase(pageContent?.slug)}
            </p>
          </div>
          <div className="">
            <AppsLogo pageContent={pageContent} />
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal">
              Add a form to your{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                {pageContent?.title}
              </span>
            </h1>
            <p className="mt-8 text-gray-400">
              Initiate the collection of form submissions from your{" "}
              {pageContent?.title} form using formzillion. <br /> Simply create
              your form in formzillion and insert your form-id into your form.
            </p>
            <div className="flex flex-row justify-center mt-10">
              <a
                href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer inline-flex rounded text-center text-base px-4 py-2 leading-none text-white bg-orange-600 hover:bg-orange-700 mt-4 lg:mt-0   h-[40px] ml-2 items-center content-center justify-center"
              >
                Try Formzillion its free
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_DOCS_URL}`}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-orange-600 px-4 py-2 text-base hover:text-white hover:bg-orange-600 text-orange-600 ml-8"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="border-b border-gray-800 border-dashed my-10 mx-auto max-w-5xl"></div>
      <div className="max-w-5xl mx-auto steps my-10">{pageContent?.steps}</div>
    </>
  );
}
