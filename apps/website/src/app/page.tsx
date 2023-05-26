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

export default async function page() {

  const url = "https://api.github.com/repos/formzillion/formzillion.com";
  // To get a github stars count:
  const gitHubStar = await fetch(url, { cache: 'force-cache' })
  const data = await gitHubStar.json();
  const starCount = data?.stargazers_count;

  // To get a github contributors count:
  const gitHubContributors = await fetch(`${url}/contributors`, { cache: 'force-cache'})
  const contributorsData = await gitHubContributors.json();
  const contributorsCount = contributorsData?.length

  return (
    <>
      <HeroSection />
      <FeaturesTab />
      <FeaturesOverviewNew />
      <OpenSource starCount={starCount} contributorCount={contributorsCount}/>
    </>
  );
}
