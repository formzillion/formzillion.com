import React from "react";

import FeaturesOverview from "./home/FeaturesOverview";
import BlurDotGridTop from "./home/WaitlistHeroSection/BlurDotGridTop";
import BlurDotGridBottom from "./home/WaitlistHeroSection/BlurDotGridBottom";
import SpamFiltersIllustration from "./home/Features/SpamFilters/SpamFiltersIllustration";
import RedirectsIllustration from "./home/Features/Redirects/RedirectsIllustration";
import CTABanner from "./home/CTABanner";
import FeatureSection from "./home/Features/FeatureSection";
import HeroSection from "./home/WaitlistHeroSection/HeroSection";
import InviteTeamIllustration from "./home/Features/Collaboration/InviteTeamIllustration";
import IntegrationsIllustration from "./home/Features/Integrations/IntegrationsIllustration";
import OpenSource from "./home/OpenSource";

export default function page() {
  return (
    <>
      <BlurDotGridTop />
      <BlurDotGridBottom />
      <HeroSection />
      <FeaturesOverview />
      <FeatureSection
        title="Safeguard your forms from spam."
        description="Formzillion employs a combination of machine learning and human review to ensure that your form submissions are free of spam. Just enable the filters you need and we'll take care of the rest."
        illustration={<SpamFiltersIllustration />}
        reverse={true}
        action="https://docs.formzillion.com/features/spam-filtering"
      />
      <FeatureSection
        title="Impress your users with an amazing after-submission experience."
        description="Redirect your users to a custom URL after they submit your form. Or use our built-in thank you page to show custom messages to your users."
        illustration={<RedirectsIllustration />}
        reverse={false}
        action="https://docs.formzillion.com/features/redirects"
      />
      <FeatureSection
        title="Collaborate with your teams and clients."
        description="Create teams, share forms and user submissions with your team members and clients. You can also set up custom roles and permissions to control who can access what."
        illustration={<InviteTeamIllustration />}
        reverse={true}
        action="https://docs.formzillion.com/features/collaboration"
      />
      <FeatureSection
        title="Keep your clients and team members in sync and stay productive."
        description="Connect your favorite tools to Formzillion and automate your communication with clients and team members. Autoreply to your users, send notifications to your team members and clients, and much more."
        illustration={<IntegrationsIllustration />}
        reverse={false}
        action="https://docs.formzillion.com/features/collaboration"
      />
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
