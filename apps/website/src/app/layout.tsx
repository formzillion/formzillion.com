import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import Footer from "./shared/FooterV2";
import "../assets/styles/globals.css";
import Header from "./shared/Header";
import DisclosureNav from "./shared/DisclosureNav";

export const metadata: Metadata = {
  title: "Formzillion - Instant backend for all your forms",
  description: "Instant backend for all your forms",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <body className="overflow-x-hidden">
        <Header />
        <DisclosureNav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
