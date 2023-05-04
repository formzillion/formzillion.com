import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

import Sidebar from "@/ui/Sidebar";
import Billing from "./Billing";

export default async function Page({ params }: any) {
  const { teamId: teamSlug } = params;
  const account = await prisma.teams.findFirst({
    where: {
      slug: teamSlug,
    },
  });

  return (
    <div className="w-full space-y-5 ">
      {!isEmpty(account) && (
        <Billing userDetails={account} teamSlug={teamSlug} />
      )}
    </div>
  );
}
