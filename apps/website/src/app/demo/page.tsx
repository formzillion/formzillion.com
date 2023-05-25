import React from "react";
import SeeInAction from "./SeeInAction";
import Features from "./Features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo - Formzillion",
  description:
    "Explore our demo page and immerse yourself in the frontend customer-facing interface. Submit your information using our sample form to get a hands-on experience of our platform. Discover the seamless user interaction and functionality we offer for a smooth customer journey.",
  keywords: "sample form, user experience, Formzillion demo, html, React, Vue",
  alternates: {
    canonical: "https://formzillion.com/pricing",
  },
};

export default function page() {
  return (
    <div>
      <SeeInAction />
      <Features />
    </div>
  );
}
