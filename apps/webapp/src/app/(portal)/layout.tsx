import { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "./shared/Navbar";
import { getUserDetail } from "@/utils/getUserDetail";
import prisma from "@/lib/prisma";
import { isEmpty } from "lodash";
import { redirect } from "next/navigation";
import FzLoader from "@/components/FzLoader";

interface IProps {
  children: React.ReactNode;
  params: {
    formId: string;
    teamId: string;
  };
}
export const metadata: Metadata = {
  title: "Formzillion - Tools for your business",
  description: "Instant backend for all your forms.",
};

export default async function PortalLayout({ children }: IProps) {
  const user = await getUserDetail();
  const serializedTeams = JSON.stringify(user?.teams || []);

  return (
    <>
      {!isEmpty(user?.teams) && (
        <div className="min-h-screen bg-white font-[Satoshi] dark:bg-black">
          <Navbar teams={serializedTeams} user={user} />
          <Suspense fallback={<FzLoader />}>
            <div className="flex flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
}
