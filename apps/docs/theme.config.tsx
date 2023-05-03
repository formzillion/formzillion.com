import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import AppLogo from "./components/AppLogo";

const config: DocsThemeConfig = {
  logo: <AppLogo />,
  project: {
    link: "https://github.com/formzillion",
  },
  chat: {
    link: "https://discord.com",
  },
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
  head: function Head() {
    return (
      <link rel="icon" type="image/x-icon" sizes="any" href={`favicon.ico`} />
    );
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} The Formzillion Project.
        </p>
      </div>
    ),
  },
};

export default config;
