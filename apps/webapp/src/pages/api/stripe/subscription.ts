import { NextApiRequest, NextApiResponse } from "next";
import stripeApi from "@/lib/stripe/stripe-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    createSubscription(req, res);
  }
  if (req.method === "DELETE") {
    deleteSubscription(req, res);
  }
}

// Add the subscription
async function createSubscription(req: NextApiRequest, res: NextApiResponse) {
  const { customerId, planId }: any = req.body;

  const subscription = stripeApi.createSubscription({ customerId, planId });
  res.send(subscription);
}

// Delete the subscription
async function deleteSubscription(req: NextApiRequest, res: NextApiResponse) {
  const { subscriptionId }: any = req.body;

  const subscription = stripeApi.deleteSubscription({ subscriptionId });
  res.send(subscription);
}
