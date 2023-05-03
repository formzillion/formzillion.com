import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import stripeApi from "@/lib/stripe/stripe-api";
import { getUserDetails } from "@/lib/getUserDetails";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await getAccountDetails(req, res);
  }
}

//Get All Payment Methods associated with Customer
async function getAccountDetails(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { customerId, planId } = JSON.parse(req.body);

  const subscriptions: Stripe.ApiList<Stripe.Subscription> =
    await stripeApi.listSubscriptions({
      customerId,
      plan: planId,
    });

  const paymentMethods: Stripe.ApiList<Stripe.PaymentMethod> =
    await stripeApi.listPaymentMethods({
      customerId,
    });

  const invoices: Stripe.ApiList<Stripe.Invoice> = await stripeApi.listInvoices(
    {
      customerId,
    }
  );

  return res.status(200).json({
    success: true,
    subscriptions: subscriptions?.data || [],
    paymentMethods: paymentMethods?.data || [],
    invoices: invoices.data || [],
  });
}
