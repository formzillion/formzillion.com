import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

import Sidebar from "@/ui/Sidebar";

import Invoice from "./invoices";

export default async function Page({ params }: any) {
  const { teamId: teamSlug } = params;
  const account = await prisma.teams.findFirst({
    where: {
      slug: teamSlug,
    },
  });

  return (
    <div className="w-full">
      {!isEmpty(account) && <Invoice userDetails={account} />}
    </div>
  );
}
