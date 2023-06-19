import React from "react";
import { howToConnect } from "./content/howToConnect";

export default function HowToConnect({ slug }: any) {
  const pageContent = howToConnect.find(
    (content: any) => content.slug === slug
  );

  return (
    <div className="mt-20 rounded-2xl bg-gray-400/10 py-6 px-4">
      <div className="text-center space-y-4">
        <p className="text-2xl sm:text-3xl font-normal">
          How to{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            create a workflow{" "}
          </span>
          between Formzillion and {""}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            {pageContent?.title}
          </span>
        </p>
        <p className="text-gray-400 mx-auto max-w-2xl text-base">{pageContent?.subtitle}</p>
      </div>

      <div className="mt-10 mx-auto max-w-xl text-gray-300 space-y-5">
        {/* <p className="text-lg font-medium">{`Steps to connect with ${pageContent?.title}`} : </p> */}
        {pageContent?.steps.map((step: any, idx: number) => (
          <div
            key={idx}
            className="p-2 border rounded border-gray-900 space-y-4 hover-border"
          >
            <div className="bg-black p-4 rounded relative z-10 h-full space-y-5">
              <div className="flex items-center space-x-5">
                {step.icon}
                <div className="w-[98%]">
                  <h2 className="text-lg my-1 font-medium">{step.title}</h2>
                  <p
                    className="text-gray-400 text-sm"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
