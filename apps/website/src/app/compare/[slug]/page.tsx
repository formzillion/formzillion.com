import React from "react";
import { toLower } from "lodash";
import HeroSection from "./HeroSection";
import CompareSection from "./CompareSection";
import Demo from "./Demo";

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
    return <div>Invalid slug</div>;
  }
  return (
    <div>
      <HeroSection slug={params.slug} />
      <CompareSection slug={params.slug} />
      <Demo />
    </div>
  );
}
