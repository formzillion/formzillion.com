import { NextApiRequest, NextApiResponse } from "next";
import stripeApi from "@/lib/stripe/stripe-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getPaymentMethods(req, res);
  } else if (req.method === "POST") {
    await createPaymentMethod(req, res);
  } else if (req.method === "DELETE") {
    await deletePaymentMethod(req, res);
  }
}

//Get All Payment Methods associated with Customer
async function getPaymentMethods(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { customerId }: any = req.body;
  const paymentMethods = await stripeApi.listPaymentMethods({ customerId });
  return res.send(paymentMethods);
}

//Add Payment Method to Customer
async function createPaymentMethod(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { customerId, cardNumber, expMonth, expYear, cvc, email, name }: any =
    req.body;

  // Create Payment Method
  const paymentMethod = await stripeApi.createPaymentMethod({
    customerId,
    cardNumber,
    expMonth,
    expYear,
    cvc,
    email,
    name,
  });

  return res.send(paymentMethod);
}

/**
 *  Delete Payment Method from Customer
 */
async function deletePaymentMethod(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { paymentMethodId }: any = req.body;
  const paymentMethod = await stripeApi.deletePaymentMethod(
    paymentMethodId //'pm_1MeWoYLMF4TH29Y4l8BG8Nw4'
  );
  return res.send(paymentMethod);
}
