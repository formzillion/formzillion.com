import React from "react";
import type { Metadata } from "next";

import HeroSection from "./home/WaitlistHeroSection/HeroSection";
import OpenSource from "./home/OpenSource";
import FeaturesOverviewNew from "./home/FeaturesOverviewNew";
import FeaturesTab from "./home/Features/FeaturesTab";

export const metadata: Metadata = {
  title: "Formzillion - The open-source form infrastructure for everyone",
  description:
    "Automate and streamline your forms with Formzillion's instant backend. Retain full control over the appearance and style of your forms. Sign up now for free!",
  keywords:
    "Open source, headless forms, automate, email notification, spam, forms submission, integrations",
};

export default function page() {
  return (
    <>
      <HeroSection />
      <FeaturesTab />
      <FeaturesOverviewNew />
      <OpenSource />

      {/*<SeeItInAction />
      <div className="bg-white features-section">
        <div className="mx-auto px-8 py-12" style={{ maxWidth: "1600px" }}>
          <PlugAndPlay />
          <div className="mb-12"></div>
          <ViewSubmissions />
          <div className="mb-16"></div>
          <CustomizeSection />
          <div className="mb-16"></div>
          <ColloborateSection />
        </div>
      </div>
      <CtaSection />*/}
    </>
  );
}
