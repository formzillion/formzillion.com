import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import AppLogo from "./components/AppLogo";
import { useRouter } from "next/router";
import ArrowIcon from "./components/ArrowIcon";

const config: DocsThemeConfig = {
  logo: <AppLogo />,
  docsRepositoryBase:
    "https://github.com/formzillion/formzillion.com/blob/main/apps/docs",
  useNextSeoProps() {
    const { asPath } = useRouter();

    const addNoIndexNoFollow =
      process?.env?.NEXT_PUBLIC_NODE_ENV !== "production"
        ? {
            noindex: true,
            nofollow: true,
          }
        : {};
    if (asPath !== "/") {
      return {
        titleTemplate: `%s - Formzillion`,
        ...addNoIndexNoFollow,
      };
    } else {
      return {
        ...addNoIndexNoFollow,
      };
    }
  },
  primaryHue: 31,
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 2,
    toggleButton: true,
  },
  head: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { asPath } = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { frontMatter } = useConfig();
    const { tags } = frontMatter;
    const url = `https://docs.formzillion.com${asPath}`;

    return (
      <>
        <link
          rel="icon"
          type="image/x-icon"
          sizes="any"
          href={"/favicon.ico"}
        />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={url} />
        {tags && <meta name="keywords" content={tags} />}
      </>
    );
  },
  footer: {
    text: (
      <div className="nx-w-full">
        <div className="nx-w-full nx-flex nx-justify-around nx-text-gray-600 dark:nx-text-gray-300">
          <div className="nx-flex nx-flex-col">
            <h6 className="nx-font-medium nx-text-base">Docs</h6>
            <a href="/" className="hover:nx-text-primary-600">
              Introduction
            </a>
            <a href="/setup" className="hover:nx-text-primary-600">
              Setup
            </a>
            <a href="/features" className="hover:nx-text-primary-600">
              Features
            </a>
          </div>
          <div className="nx-flex nx-flex-col">
            <h6 className="nx-font-medium nx-text-base">Community</h6>
            <a
              href="https://formzillion.slack.com/join/shared_invite/zt-1urntbbmb-o0d6Qzdl~GzfePoZE7JTYw"
              target="_blank"
              className="nx-flex nx-items-center hover:nx-text-primary-600"
            >
              Slack <ArrowIcon />
            </a>
            <a
              href="https://github.com/formzillion/formzillion.com"
              target="_blank"
              className="nx-flex nx-items-center hover:nx-text-primary-600"
            >
              GitHub <ArrowIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/formzillion/"
              target="_blank"
              className="nx-flex nx-items-center hover:nx-text-primary-600"
            >
              LinkedIn <ArrowIcon />
            </a>
          </div>
          <div className="nx-flex nx-flex-col">
            <h6 className="nx-font-medium nx-text-base">More</h6>
            <a
              href="https://formzillion.com/"
              target="_blank"
              className="nx-flex nx-items-center hover:nx-text-primary-600"
            >
              Formzillion website <ArrowIcon />
            </a>
          </div>
        </div>
        <p className="nx-mt-6 text-xs nx-text-center">
          © {new Date().getFullYear()} The Formzillion Project.
        </p>
      </div>
    ),
  },
};

export default config;
