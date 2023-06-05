import Gatsby from "./steps/Gatsby";
import Wordpress from "./steps/Wordpress";
import Nextjs from "./steps/Nextjs";
import Webflow from "./steps/Webflow";
import Vuejs from "./steps/Vuejs";
import React from "./steps/React";
import Ghost from "./steps/Ghost";
import Shopfiy from "./steps/Shopfiy";
import Nuxt from "./steps/Nuxt";
import Svelte from "./steps/Svelte";
import Eleventy from "./steps/Eleventy";
import Gridsome from "./steps/Gridsome";

export const platformsData = [
  {
    slug: "wordpress",
    image: "/guides/wordpress.png",
    title: "Wordpress",
    steps: <Wordpress />,
  },
  {
    slug: "gatsby",
    image: "/guides/gatsby.png",
    title: "Gatsby",
    steps: <Gatsby />,
  },
  {
    slug: "nextjs",
    image: "/guides/next.png",
    title: "Next.js",
    steps: <Nextjs />,
  },
  {
    slug: "webflow",
    image: "/guides/webflow.svg",
    title: "Webflow",
    steps: <Webflow />,
  },
  {
    slug: "react",
    image: "/guides/react.svg",
    title: "React",
    steps: <React />,
  },
  {
    slug: "vuejs",
    image: "/guides/vuejs.svg",
    title: "Vue.js",
    steps: <Vuejs />,
  },
  {
    slug: "ghost",
    image: "/guides/ghost.png",
    title: "Ghost",
    steps: <Ghost />,
  },
  {
    slug: "shopify",
    image: "/guides/shopify.svg",
    title: "Shopify",
    steps: <Shopfiy />,
  },
  {
    slug: "svelte",
    image: "/guides/svelte.svg",
    title: "Svelte",
    steps: <Svelte />,
  },
  {
    slug: "nuxt",
    image: "/guides/nuxtjs.svg",
    title: "Nuxt",
    steps: <Nuxt />,
  },
  {
    slug: "eleventy",
    image: "/guides/11ty.svg",
    title: "11ty",
    steps: <Eleventy/>,
  },
  {
    slug: "gridsome",
    image: "/guides/gridsome.svg",
    title: "Gridsome",
    steps: <Gridsome />,
  }
];
