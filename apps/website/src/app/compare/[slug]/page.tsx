import React from "react";
import { startCase, toLower } from "lodash";
import HeroSection from "./HeroSection";
import CompareSection from "./CompareSection";
import Demo from "./Demo";
import NotFound from "@/app/not-found";

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const slugTitle = startCase(slug);

  return {
    title: `${slugTitle} Alternative - Formzillion`,
    description: `Compare ${slugTitle} with Formzillion. A better Open source alternative for ${slugTitle} `,
    alternates: {
      canonical: `https://formzillion.com/compare/${slug}`,
    },
    keywords: `${slug}, compare, altrenative for ${slug},}`,
  };
}

export default function page({ params }: { params: { slug: string } }) {
  const dynamicData = [
    {
      slug: "FormSpree",
      imageUrl: "/logos/wordpress.png",
    },
    {
      slug: "Basin",
      imageUrl: "/logos/gatsby.png",
    },
    {
      slug: "Formcarry",
      imageUrl: "/logos/nextjs.png",
    },
    {
      slug: "Getform",
      imageUrl: "/logos/webflow.svg",
    },
    {
      slug: "Formspark",
      imageUrl: "/logos/webflow.svg",
    },
  ];
  const dynamicContent = dynamicData.find(
    (content) => toLower(content.slug) === params.slug
  );
  if (!dynamicContent) {
    return <NotFound />;
  }
  return (
    <div>
      <HeroSection slug={params.slug} />
      <CompareSection slug={params.slug} />
      <Demo />
    </div>
  );
}
