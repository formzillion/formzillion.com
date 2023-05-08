import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

import Invoice from "./invoices";
import Stripe from "stripe";
import stripeApi from "@/lib/stripe/stripe-api";

export default async function Page({ params }: any) {
  const { teamId: teamSlug } = params;
  const account = await prisma.teams.findFirst({
    where: {
      slug: teamSlug,
    },
  });
  const customerId = account?.billingCustomerId;
  const invoices: Stripe.ApiList<Stripe.Invoice> = await stripeApi.listInvoices(
    {
      customerId,
    }
  );
  return (
    <div className="w-full">
      {!isEmpty(account) && <Invoice invoices={invoices} />}
    </div>
  );
}
