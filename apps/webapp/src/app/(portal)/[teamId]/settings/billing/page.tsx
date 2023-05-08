import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

import Billing from "./Billing";
import stripeApi from "@/lib/stripe/stripe-api";

export default async function Page({ params }: any) {
  const { teamId: teamSlug } = params;
  const account = await prisma.teams.findFirst({
    where: {
      slug: teamSlug,
    },
  });
  const customerId = account?.billingCustomerId;
  const planId = account?.planId;
  const subscriptions: any = await stripeApi.listSubscriptions({
    customerId,
    plan: planId,
  });
  const subscription = subscriptions.data?.[0];
  return (
    <div className="w-full space-y-5 ">
      {!isEmpty(account) && (
        <Billing
          userDetails={account}
          teamSlug={teamSlug}
          subscription={subscription}
        />
      )}
    </div>
  );
}
