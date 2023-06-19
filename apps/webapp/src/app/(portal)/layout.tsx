import { Suspense } from "react";
import { Metadata } from "next";
import { isEmpty } from "lodash";

import { getUserDetail } from "@/utils/getUserDetail";
import FzLoader from "@/components/FzLoader";
import Navbar from "./shared/Navbar";
import DisclosureNav from "./shared/DisclosureNav";

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
          <DisclosureNav teams={serializedTeams} user={user} />
          <Suspense fallback={<FzLoader />}>
            <div className="flex flex-col">
              <main className="flex-1 px-4 sm:px-6 py-3">{children}</main>
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
}
