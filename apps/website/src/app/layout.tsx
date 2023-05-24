import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import Footer from "./shared/FooterV2";
import "../assets/styles/globals.css";
import Header from "./shared/Header";
import DisclosureNav from "./shared/DisclosureNav";
import CTASection from "./shared/CTASection";

export const metadata: Metadata = {
  title: "Formzillion - The open-source form infrastructure for everyone",
  description:
    "Instant backend for all your forms. Formzillion provides a seamless and automated headless form management solution.",
  keywords: `open source forms, formzillion, instant backend for all your forms, headless forms, automate, email notification, spam protection, forms submission, integrations`,
  alternates: {
    canonical: "https://formzillion.com/",
  },
  openGraph: {
    title: "Formzillion - The open-source form infrastructure for everyone",
    description: `Formzillion provides a seamless and automated headless form management solution. Retain full control over the style and appearance of your forms while enjoying the benefits of automation. Sign up now!`,
    url: "https://formzillion.com/",
    siteName: "Formzillion - The open-source form infrastructure for everyone",
    type: "website",
    images: [
      {
        url: "og-image.png",
        alt: "Formzillion",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark h-screen bg-black`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <body className="overflow-x-hidden">
        <Header />
        <DisclosureNav />
        <main className="min-h-screen">{children}</main>
        <CTASection />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
