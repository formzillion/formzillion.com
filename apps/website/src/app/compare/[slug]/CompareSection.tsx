import { CheckIcon, MinusIcon } from "@heroicons/react/24/solid";
import { camelCase, startCase, toLower } from "lodash";
import Image from "next/image";
import React, { Fragment } from "react";

export default function CompareSection({ slug }: any) {
  const dynamicData = [
    {
      slug: "Formspree",
      imageUrl: "/brands/formspree.png",
    },
    {
      slug: "Basin",
      imageUrl: "/brands/basin.png",
    },
    {
      slug: "Formcarry",
      imageUrl: "/brands/formcarry.svg",
    },
    {
      slug: "Getform",
      imageUrl: "/brands/getform.svg",
    },
    {
      slug: "Formspark",
      imageUrl: "/brands/Formspark.webp",
    },
  ];
  const application: any = [
    {
      name: "Formzillion",
      id: "formzillion",
      imageUrl: "/logos/favicon.svg",
      mostPopular: true,
    },
  ];
  dynamicData.map((app) => {
    toLower(app.slug) == slug
      ? application.push({
          name: app.slug,
          id: camelCase(app.slug),
          imageUrl: app.imageUrl,
          mostpopular: false,
        })
      : "";
  });
  const sections: any = [
    {
      name: "",
      features: [
        {
          name: "Open Source",
          apps: {
            Formzillion: true,
          },
        },
        {
          name: "Price",
          apps: {
            Formzillion: "5-100 $/month",
            Formspree: "10-102 $ /month",
            Formcarry: "19-99 $ /month",
            Basin: "12-108 $ /month",
            Getform: "12-99 $ /month",
            Formspark: "25$ lifetime",
          },
        },
        {
          name: "Monthly Submissions",
          apps: {
            Formzillion: "5 to Unlimited",
            Formspree: "5 to 100",
            Formcarry: "Unlimited",
            Basin: "10-250",
            Getform: "5 to Unlimited",
            Formspark: "Unlimited",
          },
        },
        {
          name: "Monthly Submissions",
          apps: {
            Formzillion: "Up to 30,000",
            Formspree: "Up to 10,000",
            Formcarry: "Up to 40,000",
            Basin: "Up to 25,000",
            Getform: "Up to 100,000",
            Formspark: "50,000 life time",
          },
        },
        {
          name: "File Uploads",
          apps: {
            Formzillion: "Up to 25GB",
            Formspree: "Up to 10GB",
            Formcarry: "Up to 15GB",
            Basin: "Up to 50GB",
            Getform: "Up to 10GB",
          },
        },
        {
          name: "Submission Export",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: true,
            Basin: true,
            Getform: true,
            Formspark: true,
          },
        },
        {
          name: "Autoresponses",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: true,
            Basin: true,
            Getform: true,
            Formspark: false,
          },
        },
        {
          name: "Form Sharing",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: true,
            Basin: true,
            Getform: true,
            Formspark: true,
          },
        },
        {
          name: "Advanced Spam Filtering",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: true,
            Basin: true,
            Getform: true,
            Formspark: true,
          },
        },
        {
          name: "Custom Honeypot",
          apps: {
            Formzillion: "All paid plans",
            Formspree: "Business plan",
            Basin: "All paid plans",
            Formspark: "All plans",
          },
        },
        {
          name: "Custom Redirect",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: true,
            Basin: true,
            Getform: true,
            Formspark: true,
          },
        },
        {
          name: "Ajax Forms",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: true,
            Basin: true,
            Getform: true,
            Formspark: true,
          },
        },
        {
          name: "Third-party Integrations",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: true,
            Basin: true,
            Getform: true,
            Formspark: true,
          },
        },
        {
          name: "Custom Webhooks",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: "Zapier only",
            Basin: true,
            Getform: true,
            Formspark: true,
          },
        },
        {
          name: "Submissions API",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: true,
            Basin: true,
            Getform: true,
            Formspark: true,
          },
        },
        {
          name: "Priority Support",
          apps: {
            Formzillion: true,
            Formspree: true,
            Formcarry: true,
            Basin: true,
            Getform: true,
            Formspark: true,
          },
        },
      ],
    },
  ];

  return (
    <div className="bg-black py-8 lg:py-16 w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug">
            Why is Formzillion is a better alternative compare to{" "}
            {startCase(slug)}?
          </h1>
        </div>
        <div className="isolate md:mt-20 ">
          <div className="relative -mx-8 ">
            <div className="absolute inset-y-0 inset-x-4 -z-10 flex">
              <div
                className="md:flex md:w-1/3 px-4 hidden"
                aria-hidden="true"
                style={{
                  marginLeft: `${
                    (application.findIndex((app: any) => app.mostPopular) + 1) *
                    33.333
                  }%`,
                }}
              >
                <div className="w-full rounded-xl border-x border-y border-white/10 bg-gray-400/5" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full md:table-fixed border-separate border-spacing-8 text-left overflow-x-scroll overflow-hidden">
                <caption className="sr-only">Pricing plan comparison</caption>
                <colgroup>
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                  {/* <col className="w-1/3" /> */}
                </colgroup>
                <thead>
                  <tr>
                    <td />
                    {application.map((app: any) => (
                      <th
                        key={app.id}
                        scope="col"
                        className="px-6 pt-6 xl:px-8 xl:pt-8"
                      >
                        <div className="text-lg font-semibold leading-7  w-full justify-center text-white flex space-x-2">
                          <Image
                            src={app.imageUrl}
                            alt={`app.name logo`}
                            height={30}
                            width={30}
                          />{" "}
                          <div>{app.name}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section: any, sectionIdx: any) => (
                    <Fragment key={section.name}>
                      {section.features.map((feature: any) => (
                        <tr key={feature.name}>
                          <th
                            scope="row"
                            className="text-sm text-center font-normal leading-6 text-gray-400 flex justify-center"
                          >
                            {feature.name}
                            <div className="absolute inset-x-8 h-px bg-black/5" />
                          </th>
                          {application.map((app: any) => (
                            <td key={app.id} className="px-6 xl:px-8">
                              {typeof feature.apps[startCase(app.id)] ===
                              "string" ? (
                                <div className="text-center text-sm leading-6 text-white">
                                  {feature.apps[startCase(app.id)]}
                                </div>
                              ) : (
                                <>
                                  {feature.apps[startCase(app.id)] === true ? (
                                    <>
                                      <CheckIcon
                                        className="mx-auto h-5 w-5 text-orange-600"
                                        aria-hidden="true"
                                      />
                                    </>
                                  ) : (
                                    <MinusIcon
                                      className="mx-auto h-5 w-5 text-white"
                                      aria-hidden="true"
                                    />
                                  )}

                                  <span className="sr-only">
                                    {feature.apps[startCase(app.id)] === true
                                      ? "Included"
                                      : "Not included"}{" "}
                                    in {app.name}
                                  </span>
                                </>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
