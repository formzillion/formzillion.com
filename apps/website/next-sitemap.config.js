/** @type {import('next-sitemap').IConfig} */

const routes = [
  "integrations/slack",
  "integrations/airtable",
  "integrations/webhooks",
  "integrations/sendgrid",
  "integrations/mailerlite",
  "integrations/freshdesk",
  "compare/getform",
  "compare/formspree",
  "compare/formcarry",
  "compare/formspark",
  "compare/basin",
  "guides/wordpress",
  "guides/gatsby",
  "guides/nextjs",
  "guides/webflow",
  "guides/eleventy",
  "guides/nuxt",
  "guides/react",
  "guides/svelte",
  "guides/vuejs",
  "guides/ghost"
];

module.exports = {
  siteUrl: "https://formzillion.com",
  generateRobotsTxt: true,
  additionalPaths: async () => {
    return routes.map((route) => ({
      loc: `https://formzillion.com/${route}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    }));
  },
};
