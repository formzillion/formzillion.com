import Image from "next/image";
import React from "react";
import CTABanner from "@/app/home/CTABanner";

export default function DynamicSection({
  params,
}: {
  params: { slug: string };
}) {
  const dynamicData = [
    {
      slug: "wordpress",
      imageUrl: "/logos/wordpress.png",
      description: "A backend for your Wordpress forms",
      title: "Getting started with WordPress is simple",
    },
    {
      slug: "gatsby",
      imageUrl: "/logos/gatsby.png",
      description: "A backend for your Gatsby forms",
      title: "Getting started with gatsby is simple",
    },
    {
      slug: "nextjs",
      imageUrl: "/logos/nextjs.png",
      description: " A backend for your Next.js forms",
      title: "Getting started with Next.js is simple",
    },
    {
      slug: "webflow",
      imageUrl: "/logos/webflow.svg",
      description: " A backend for your Webflow forms",
      title: "Getting started with Webflow is simple",
    },
  ];
  const staticData = [
    {
      title: "Start collecting submissions with Formzillion ",
      description:
        "Start collecting data in a matter of clicks.<br />  Let formzillion take care of the servers, databases,and analytics <br /> Set up any form in seconds.",
    },
  ];
  const dynamicContent = dynamicData.find(
    (content) => content.slug === params.slug
  );
  if (!dynamicContent) {
    return <div>Invalid slug</div>;
  }
  return (
    <section>
      <div className="relative flex flex-col justify-center content-center items-center rounded-md text-center mt-28">
        <div className="w-full h-full flex flex-col py-20 px-10 justify-center items-center ">
          <img
            className="object-scale-down h-20 w-30 object-center rounded"
            alt="hero"
            src={dynamicContent.imageUrl}
          />
          <div className=" text-xl font-medium leading-normal font-['Satoshi']">
            <h1 className="title-font sm:text-4xl text-4xl mb-4 text-white font-semibold mt-8">
              <div
                dangerouslySetInnerHTML={{ __html: dynamicContent.description }}
              />
            </h1>
            <div className="flex flex-row justify-center mt-10">
              <a
                href="https://rkq53epk2c1.typeform.com/to/oflWmqo6"
                className="cursor-pointer inline-flex text-center font-['Satoshi'] text-sm px-4 py-2 leading-none text-white bg-orange-600 hover:bg-orange-700 mt-4 lg:mt-0 w-[160px] h-[40px] ml-2 items-center content-center justify-center"
              >
                Request Access
              </a>
              <a
                href="https://docs.formzillion.com/"
                className="cursor-pointer ml-8 inline-flex text-center font-['Satoshi'] text-sm px-4 py-2 leading-none border text-white border-white hover:text-orange-600 mt-4 lg:mt-0 w-[150px] h-[40px] hover:border-orange-600 items-center justify-center"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-xl font-medium leading-normal font-['Satoshi']">
        <h1 className="title-font sm:text-4xl text-4xl mb-4 text-white font-semibold mt-8">
          <h1 className="text-3xl mr-6 mt-8 text-center">
            {dynamicContent.title}
          </h1>
        </h1>

        {staticData.map((data, index) => (
          <div key={index}>
            <div
              className="leading-10 mt-4 text-xl text-center"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        ))}
      </div>

      <div>
        <CTABanner />
      </div>
    </section>
  );
}
