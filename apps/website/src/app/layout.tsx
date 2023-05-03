import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import Header from "./shared/HeaderV2";
import Footer from "./shared/FooterV2";
import "../assets/styles/globals.css";

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
    <html lang="en" className={`dark h-screen bg-black`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
