import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import stripeApi from "@/lib/stripe/stripe-api";
import { getUserDetails } from "@/lib/getUserDetails";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return await listInvoices(req, res);
  }
}

//Get All Payment Methods associated with Customer
async function listInvoices(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const user: any = await getUserDetails(req, res);

  const invoices: Stripe.ApiList<Stripe.Invoice> = await stripeApi.listInvoices(
    {
      customerId: user?.billingCustomerId,
    }
  );
  return res.send(invoices);
}
