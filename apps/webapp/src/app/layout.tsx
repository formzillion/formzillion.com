import "../assets/styles/globals.css";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import HotToaster from "@/ui/Toast/HotToaster";
import { createServerClient } from "@/utils/supabase-server";
import SupabaseProvider from "@/components/SupbaseProvider";
import SupabaseListener from "@/components/SupbaseListener";
import type { Database } from "../db_types";
import { ThemeProvider } from "@/ui/ThemeProvider";

export type TypedSupabaseClient = SupabaseClient<Database>;

// do not cache this layout
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Formzillion - Instant backend for all your forms",
  description: "Instant backend for all your forms",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <body className="overflow-x-hidden font-sans antialiased dark:bg-black">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HotToaster />
          <SupabaseProvider session={session}>
            <SupabaseListener serverAccessToken={session?.access_token} />
            {children}
          </SupabaseProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
