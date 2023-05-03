import { Fragment } from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";

const tiers: any = [
  {
    name: "Personal",
    id: "tier-basic",
    href: "#",
    priceMonthly: "$9",
    description: "Quis suspendisse ut fermentum neque vivamus non tellus.",
    mostPopular: false,
  },
  {
    name: "Professional",
    id: "tier-essential",
    href: "#",
    priceMonthly: "$29",
    description: "Quis eleifend a tincidunt pellentesque. A tempor in sed.",
    mostPopular: true,
  },
  {
    name: "Agency",
    id: "tier-premium",
    href: "#",
    priceMonthly: "$59",
    description:
      "Orci volutpat ut sed sed neque, dui eget. Quis tristique non.",
    mostPopular: false,
  },
];
const sections: any = [
  {
    name: "Features",
    features: [
      {
        name: "Integrations",
        tiers: { Basic: true, Essential: true, Premium: true },
      },
      {
        name: "Shared links",
        tiers: { Basic: true, Essential: true, Premium: true },
      },
      {
        name: "Importing and exporting",
        tiers: { Essential: true, Premium: true },
      },
      {
        name: "Team members",
        tiers: { Essential: "Up to 20 users", Premium: "Up to 50 users" },
      },
    ],
  },
  {
    name: "Reporting",
    features: [
      {
        name: "Advanced analytics",
        tiers: { Basic: true, Essential: true, Premium: true },
      },
      { name: "Basic reports", tiers: { Essential: true, Premium: true } },
      { name: "Professional reports", tiers: { Premium: true } },
      { name: "Custom report builder", tiers: { Premium: true } },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "24/7 online support",
        tiers: { Basic: true, Essential: true, Premium: true },
      },
      {
        name: "Quarterly product workshops",
        tiers: { Essential: true, Premium: true },
      },
      {
        name: "Priority phone support",
        tiers: { Essential: true, Premium: true },
      },
      { name: "1:1 onboarding tour", tiers: { Premium: true } },
    ],
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function PriceComparison() {
  return (
    <div className="bg-black py-8 sm:py-16 font-[Satoshi]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl font-['Space_Grotesk']">
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
                  : "",
                "p-8"
              )}
            >
              <h3
                id={tier.id}
                className="text-sm font-semibold leading-6 text-white"
              >
                {tier.name}
              </h3>
              <p className="mt-2 flex items-baseline gap-x-1 text-white">
                <span className="text-4xl font-bold">{tier.priceMonthly}</span>
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
                        feature.tiers[tier.name] ? (
                          <li key={feature.name} className="flex gap-x-3">
                            <CheckIcon
                              className="h-6 w-5 flex-none text-orange-600"
                              aria-hidden="true"
                            />
                            <span>
                              {feature.name}{" "}
                              {typeof feature.tiers[tier.name] === "string" ? (
                                <span className="text-sm leading-6 text-white">
                                  ({feature.tiers[tier.name]})
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
                className="flex w-1/4 px-4"
                aria-hidden="true"
                style={{
                  marginLeft: `${
                    (tiers.findIndex((tier: any) => tier.mostPopular) + 1) * 25
                  }%`,
                }}
              >
                <div className="w-full rounded-xl border-x border-y border-white/10 bg-gray-400/5" />
              </div>
            </div>
            <table className="w-full table-fixed border-separate border-spacing-8 text-left">
              <caption className="sr-only">Pricing plan comparison</caption>
              <colgroup>
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
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
                      <div className="text-sm font-semibold leading-7 text-white">
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
                      <div className="flex items-baseline gap-x-1 text-white">
                        <span className="text-4xl font-bold">
                          {tier.priceMonthly}
                        </span>
                        <span className="text-sm font-semibold leading-6">
                          /month
                        </span>
                      </div>
                      <a
                        href={tier.href}
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
                          sectionIdx === 0 ? "pt-8" : "pt-16",
                          "pb-4 text-sm font-semibold leading-6 text-white"
                        )}
                      >
                        {section.name}
                        <div className="absolute inset-x-8 mt-4 h-px bg-black/10" />
                      </th>
                    </tr>
                    {section.features.map((feature: any) => (
                      <tr key={feature.name}>
                        <th
                          scope="row"
                          className="py-4 text-sm font-normal leading-6 text-white"
                        >
                          {feature.name}
                          <div className="absolute inset-x-8 mt-4 h-px bg-black/5" />
                        </th>
                        {tiers.map((tier: any) => (
                          <td key={tier.id} className="py-4 px-6 xl:px-8">
                            {typeof feature.tiers[tier.name] === "string" ? (
                              <div className="text-center text-sm leading-6 text-white">
                                {feature.tiers[tier.name]}
                              </div>
                            ) : (
                              <>
                                {feature.tiers[tier.name] === true ? (
                                  <CheckIcon
                                    className="mx-auto h-5 w-5 text-orange-600"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <MinusIcon
                                    className="mx-auto h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                )}

                                <span className="sr-only">
                                  {feature.tiers[tier.name] === true
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
