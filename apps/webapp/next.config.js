// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "@tremor/react"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/api/:path",
        headers: corsHeaders,
      },
      {
        source: "/formResponse",
        headers: corsHeaders,
      },
      {
        source: "/f/:path",
        headers: corsHeaders,
      },
    ];
  },
};

const corsHeaders = [
  {
    key: "Access-Control-Allow-Credentials",
    value: "true",
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
  {
    key: "Access-Control-Allow-Methods",
    value: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
  },
  {
    key: "Access-Control-Allow-Headers",
    value:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
];

/*const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com app.lemonsqueezy.com *.cloudfront.net;
    child-src 'self' gokulkrishh.lemonsqueezy.com;
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'self';
    connect-src *;
    font-src 'self';
`;*/

/*const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  /*{
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },*/
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
/*{
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), autoplay=()",
  },
];*/

module.exports = nextConfig;

// module.exports = withSentryConfig(
//   module.exports,
//   { silent: true },
//   { hideSourcemaps: true }
// );
