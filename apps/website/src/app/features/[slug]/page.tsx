import React from "react";

import BotpoisonIllustration from "../illustrations/botpoison";
import HcaptchaIllustration from "../illustrations/hcaptcha";
import CTABanner from "@/app/home/CTABanner";
import FeatureSection from "@/app/home/Features/FeatureSection";
import RecaptchaIllustration from "../illustrations/recaptcha";
import TurnstileIllustration from "../illustrations/turnstile";

export default function page() {
  return (
    <>
      <div className="lg:max-w-3xl xl:max-w-7xl max-w-xs sm:max-w-xl mx-auto lg:block">
        <FeatureSection
          title="The user-friendly anti-spam solution"
          description="Botpoison offers a user-friendly solution for preventing spam, which includes a generous free tier. Unlike CAPTCHAs, Botpoison is invisible to your users."
          illustration={<BotpoisonIllustration />}
          reverse={true}
          className="md:mb-0"
          action="https://docs.formzillion.com/setup/spam-protection/botpoison"
        />
        <FeatureSection
          title="Privacy-friendly, meet plug-and-play"
          description="CAPTCHAs are a popular and effective way to prevent bots from submitting spam through your forms. If you're looking for a free, privacy-friendly alternative to Google's reCAPTCHA"
          illustration={<HcaptchaIllustration />}
          reverse={false}
          className="md:mb-0"
          action="https://docs.formzillion.com/setup/spam-protection/hcaptcha"
        />
        <FeatureSection
          title="Google provides spam protection as a courtesy to users"
          description="A CAPTCHA is a widely-used challenge-response test designed to distinguish between real users and spam robots."
          illustration={<RecaptchaIllustration />}
          reverse={true}
          className="md:mt-0"
          action="https://docs.formzillion.com/setup/spam-protection/recaptcha-v2"
        />
        <FeatureSection
          title="A user-friendly, privacy-preserving alternative to CAPTCHA"
          description="Turnstile is a smart CAPTCHA alternative offered by Cloudflare, which can be easily integrated into any website without redirecting traffic through Cloudflare. Unlike traditional CAPTCHAs, Turnstile operates without displaying a challenge to visitors."
          illustration={<TurnstileIllustration />}
          reverse={false}
          className="md:mt-0 mb-5 "
          action="https://docs.formzillion.com/setup/spam-protection/turnstile"
        />
      </div>
      <CTABanner />
    </>
  );
}
