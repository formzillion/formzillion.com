import stripeApi from "@/lib/stripe/stripe-api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { customerId, redirectUrl } = req.query;

  const session = await stripeApi.billingPortalSessions({
    customerId: customerId,
    redirectUrl,
  });

  return res.status(200).redirect(session.url);
}
