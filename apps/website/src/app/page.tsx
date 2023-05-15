import React from "react";

import SpamFiltersIllustration from "./home/Features/SpamFilters/SpamFiltersIllustration";
import RedirectsIllustration from "./home/Features/Redirects/RedirectsIllustration";
import CTABanner from "./home/CTABanner";
import HeroSection from "./home/WaitlistHeroSection/HeroSection";
import OpenSource from "./home/OpenSource";
import FeaturesOverviewNew from "./home/FeaturesOverviewNew";
import FeaturesTab from "./home/Features/FeaturesTab";

export default function page() {
  return (
    <>
      <HeroSection />
      <FeaturesOverviewNew />
      <FeaturesTab />
      <OpenSource />
      <CTABanner />

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
