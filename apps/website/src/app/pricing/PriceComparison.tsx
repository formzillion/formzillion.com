import { Fragment } from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";
import { startCase } from "lodash";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function PriceComparison({ frequency }: any) {
  const tiers: any = [
    {
      name: "Basic",
      id: "basic",
      href: "#",
      priceMonthly: { monthly: "$5", annually: "$4.33" },
      description: "A plan that works well with personal projects.",
      mostPopular: false,
    },
    {
      name: "Standard",
      id: "standard",
      href: "#",
      priceMonthly: { monthly: "$10", annually: "$8" },
      description: "A plan that works well with freelancers.",
      mostPopular: false,
    },
    {
      name: "Premium",
      id: "premium",
      href: "#",
      priceMonthly: { monthly: "$28", annually: "$25" },
      description: "A plan that scales with your startups.",
      mostPopular: true,
    },
    {
      name: "Agency",
      id: "agency",
      href: "#",
      priceMonthly: { monthly: "$100", annually: "$85" },
      description: "A plan that fit well for agencies.",
      mostPopular: false,
    },
  ];
  const sections: any = [
    {
      name: "Core Features",
      features: [
        {
          name: "Form",
          tiers: {
            Basic: "5",
            Standard: "Unlimited",
            Premium: "Unlimited",
            Agency: "Unlimited",
          },
        },
        {
          name: "Submissions",
          tiers: {
            Basic: "250",
            Standard: "1,000",
            Premium: "6,000",
            Agency: "30,000",
          },
        },
        {
          name: "Collaboration",
          tiers: {
            Basic: "up to 5 users",
            Standard: "up to 10 users",
            Premium: "Up to 20 users",
            Agency: "Up to 50 users",
          },
        },
        {
          name: "File uploads",
          tiers: {
            Standard: "2GB",
            Premium: "10GB",
            Agency: "25GB",
          },
        },
        {
          name: "Emails Notification ",
          tiers: { Basic: true, Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Basic analytics",
          tiers: { Basic: true, Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Integrations",
          tiers: { Basic: true, Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Submission Export",
          tiers: { Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Autoresponders",
          tiers: { Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Custom thank-you page",
          tiers: { Standard: true, Premium: true, Agency: true },
        },
      ],
    },
    {
      name: "Spam Filtering",
      features: [
        {
          name: "Custom Spam Words",
          tiers: { Basic: true, Standard: true, Premium: true, Agency: true },
        },
        {
          name: "reCAPTCHA V2",
          tiers: { Standard: true, Premium: true, Agency: true },
        },
        {
          name: "reCAPTCHA V3",
          tiers: { Standard: true, Premium: true, Agency: true },
        },
        {
          name: "hCaptcha",
          tiers: { Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Botpoison",
          tiers: { Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Turnstile",
          tiers: { Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Honeypot",
          tiers: { Premium: true, Agency: true },
        },
      ],
    },
    {
      name: "Support",
      features: [
        {
          name: "Online support",
          tiers: { Basic: true, Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Priority phone support",
          tiers: { Standard: true, Premium: true, Agency: true },
        },
        {
          name: "Quarterly product workshops",
          tiers: { Premium: true, Agency: true },
        },
        { name: "1:1 onboarding tour", tiers: { Agency: true } },
      ],
    },
  ];

  return (
    <div className="bg-black py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Not sure which plan is right for you?
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-white">
          Here&apos;s a detailed comparison of our plans to help you decide.
        </p>

        {/* xs to lg */}
        <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
          {tiers.map((tier: any) => (
            <section
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200"
                  : "rounded-xl  ring-1 ring-inset ring-gray-900",
                "p-8"
              )}
            >
              <h3
                id={tier.id}
                className="text-lg font-semibold leading-6 text-white"
              >
                {tier.name}
              </h3>
              <p className="mt-2 flex items-baseline justify-center gap-x-1 text-white">
                <span className="text-4xl font-bold">
                  {tier.priceMonthly[frequency?.value]}
                </span>
                <span className="text-sm font-semibold">/month</span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-orange-600 text-white hover:bg-orange-500"
                    : "text-orange-600 ring-1 ring-inset ring-orange-200 hover:ring-orange-300",
                  "mt-8 block rounded-md py-2 px-3 text-center text-sm leading-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                )}
              >
                Buy plan
              </a>
              <ul
                role="list"
                className="mt-10 space-y-4 text-sm leading-6 text-white"
              >
                {sections.map((section: any) => (
                  <li key={section.name}>
                    <ul role="list" className="space-y-4">
                      {section.features.map((feature: any) =>
                        feature.tiers[startCase(tier.id)] ? (
                          <li key={feature.name} className="flex gap-x-3">
                            <CheckIcon
                              className="h-6 w-5 flex-none text-orange-600"
                              aria-hidden="true"
                            />
                            <span>
                              {feature.name}{" "}
                              {typeof feature.tiers[startCase(tier.id)] ===
                              "string" ? (
                                <span className="text-sm leading-6 text-white">
                                  ({feature.tiers[startCase(tier.id)]})
                                </span>
                              ) : null}
                            </span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className="isolate mt-20 hidden lg:block">
          <div className="relative -mx-8">
            <div className="absolute inset-y-0 inset-x-4 -z-10 flex">
              <div
                className="flex w-1/5 px-4"
                aria-hidden="true"
                style={{
                  marginLeft: `${
                    (tiers.findIndex((tier: any) => tier.mostPopular) + 1) * 20
                  }%`,
                }}
              >
                <div className="w-full rounded-xl border-x border-y border-white/10 bg-gray-400/5" />
              </div>
            </div>
            <table className="w-full table-fixed border-separate border-spacing-8 text-left">
              <caption className="sr-only">Pricing plan comparison</caption>
              <colgroup>
                <col className="w-1/5" />
                <col className="w-1/5" />
                <col className="w-1/5" />
                <col className="w-1/5" />
              </colgroup>
              <thead>
                <tr>
                  <td />
                  {tiers.map((tier: any) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className="px-6 pt-6 xl:px-8 xl:pt-8"
                    >
                      <div className="text-lg font-semibold leading-7 text-center text-white">
                        {tier.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <span className="sr-only">Price</span>
                  </th>
                  {tiers.map((tier: any) => (
                    <td key={tier.id} className="px-6 pt-2 xl:px-8">
                      <div className="flex items-baseline justify-center gap-x-1 text-center text-white">
                        <span className="text-4xl font-bold">
                          {tier.priceMonthly[frequency?.value]}
                        </span>
                        <span className="text-sm font-semibold leading-6">
                          /month
                        </span>
                      </div>
                      <a
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
                        className={classNames(
                          tier.mostPopular
                            ? "bg-orange-600 text-white hover:bg-orange-500"
                            : "text-orange-600 ring-1 ring-inset ring-orange-200 hover:ring-orange-300",
                          "mt-8 block rounded-md py-2 px-3 text-center text-sm leading-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        )}
                      >
                        Buy plan
                      </a>
                    </td>
                  ))}
                </tr>
                {sections.map((section: any, sectionIdx: any) => (
                  <Fragment key={section.name}>
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className={classNames(
                          sectionIdx === 0 ? "pt-8" : "pt-8",
                          "text-base font-semibold leading-6 text-white"
                        )}
                      >
                        {section.name}
                        <div className="absolute inset-x-8 h-px bg-black/10" />
                      </th>
                    </tr>
                    {section.features.map((feature: any) => (
                      <tr key={feature.name}>
                        <th
                          scope="row"
                          className=" text-sm font-normal leading-6 text-gray-400"
                        >
                          {feature.name}
                          <div className="absolute inset-x-8 h-px bg-black/5" />
                        </th>
                        {tiers.map((tier: any) => (
                          <td key={tier.id} className="px-6 xl:px-8">
                            {typeof feature.tiers[startCase(tier.id)] ===
                            "string" ? (
                              <div className="text-center text-sm leading-6 text-white">
                                {feature.tiers[startCase(tier.id)]}
                              </div>
                            ) : (
                              <>
                                {feature.tiers[startCase(tier.id)] === true ? (
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
                                  {feature.tiers[startCase(tier.id)] === true
                                    ? "Included"
                                    : "Not included"}{" "}
                                  in {tier.name}
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
  );
}
