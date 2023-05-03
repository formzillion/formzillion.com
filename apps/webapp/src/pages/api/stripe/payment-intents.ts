import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserDetails } from "@/lib/getUserDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const { user } = JSON.parse(req.body);
    // Create Setup Intent
    const params: Stripe.SetupIntentCreateParams = {
      description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? "",
      customer: user?.billingCustomerId,
      payment_method_types: ["card"],
    };
    const setupIntent: Stripe.SetupIntent = await stripe.setupIntents.create(
      params
    );

    return res.status(200).json(setupIntent);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
