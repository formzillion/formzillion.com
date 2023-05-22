import React from "react";
import type { Metadata } from "next";

import PricingPlans from "./PricingPlans";
import Faq from "./Faq";

export const metadata: Metadata = {
  title: "Pricing - Formzillion",
  description:
    "Choose from our affordable plans for headless form management with Formzillion. Enjoy the benefits of automated and streamlined forms while maintaining complete control. Sign up today!",
  keywords:
    "Formzillion, Pricing, Affordable Plans, Headless Form Management, Automated Forms, Streamlined Forms, Small or large Teams, Agency Plan, Subscription, Collaboration, Integrations, Importing & Exporting, Professional, Personal",
  alternates: {
    canonical: "https://formzillion.com/pricing",
  },
};

export default function Plans() {
  return (
    <>
      <PricingPlans />
      <Faq />
    </>
  );
}
