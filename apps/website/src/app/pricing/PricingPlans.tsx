"use client";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import FreePlan from "./FreePlan";
import PriceComparison from "./PriceComparison";

const frequencies: any = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/month" },
];

const tiers: any = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    price: { monthly: "$5", annually: "$4.33" },
    description: "A plan that works well with personal projects.",
    features: [
      "5 forms",
      "Up to 250 submissions",
      "Basic analytics",
      "48-hour support response time",
    ],
    featured: false,
    cta: "Select plan",
  },
  {
    name: "Standard",
    id: "tier-standard",
    href: "#",
    price: { monthly: "$10", annually: "$8" },
    description: "A plan that works well with freelancers.",
    features: [
      "Unlimited forms",
      "Up to 1,000 submissions",
      "Basic analytics",
      "48-hour support response time",
    ],
    featured: false,
    cta: "Select plan",
  },
  {
    name: "Premium",
    id: "tier-premium",
    href: "#",
    price: { monthly: "$28", annually: "$25" },
    description: "A plan that scales with your startups.",
    features: [
      "Unlimited forms",
      "Up to 6,000 submissions",
      "Advanced analytics",
      "Quick-support  response time",
    ],
    featured: true,
    cta: "Select plan",
  },
  {
    name: "Agency",
    id: "tier-enterprise",
    href: "#",
    price: { monthly: "$100", annually: "$85" },
    description: "A plan that fit well for agencies.",
    features: [
      "Unlimited forms",
      "Up to 30,000 submissions",
      "Advanced analytics",
      "1-hour, dedicated support response time",
    ],
    featured: false,
    cta: "Select plan",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingPlans() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <>
      <div className="bg-black py-8 sm:py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl mb-2 font-normal lg:leading-snug">
              Plans and Pricing
            </h1>
          </div>
          <p className="text-base lg:text-xl text-gray-400 text-center">
            {`Whether you're building a personal portfolio website or managing
          client projects, Formzillion has an affordable plans to meet your
          needs.`}
          </p>
          <FreePlan />
          <div className="mt-16 flex justify-center">
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
            >
              <RadioGroup.Label className="sr-only">
                Payment frequency
              </RadioGroup.Label>
              {frequencies.map((option: any) => (
                <RadioGroup.Option
                  key={option.value}
                  value={option}
                  className={({ checked }) =>
                    classNames(
                      checked ? "bg-orange-600 text-white" : "text-white",
                      "cursor-pointer rounded-full py-1 px-2.5"
                    )
                  }
                >
                  <span>{option.label}</span>
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4  ">
            {tiers.map((tier: any, idx: any) => (
              <div
                key={idx}
                className={classNames(
                  tier.featured ? "bg-white ring-white" : "ring-gray-200",
                  "rounded-3xl p-8 ring-1 xl:p-10"
                )}
              >
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.featured ? "text-black" : "text-white",
                    "text-lg font-semibold leading-8"
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={classNames(
                    tier.featured ? "text-black" : "text-white",
                    "mt-4 text-sm leading-6"
                  )}
                >
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={classNames(
                      tier.featured ? "text-black" : "text-white",
                      "text-4xl font-bold tracking-tight"
                    )}
                  >
                    {typeof tier.price === "string"
                      ? tier.price
                      : tier.price[frequency.value]}
                  </span>
                  {typeof tier.price !== "string" ? (
                    <span
                      className={classNames(
                        tier.featured ? "text-black" : "text-white",
                        "text-sm font-semibold leading-6"
                      )}
                    >
                      {frequency.priceSuffix}
                    </span>
                  ) : null}
                </p>
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? "text-black focus-visible:outline-white bordered border-orange-600 border-2"
                      : "bg-orange-600 text-white shadow-sm hover:bg-orange-500 focus-visible:outline-orange-600",
                    "mt-6 block rounded-md py-2 px-3 text-center text-sm leading-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  )}
                >
                  {tier.cta}
                </a>
                <ul
                  role="list"
                  className={classNames(
                    tier.featured ? "text-black" : "text-white",
                    "mt-8 space-y-3 text-sm leading-6 xl:mt-10"
                  )}
                >
                  {tier.features.map((feature: any) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={classNames(
                          tier.featured ? "text-black" : "text-orange-600",
                          "h-6 w-5 flex-none"
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PriceComparison frequency={frequency} />
    </>
  );
}
