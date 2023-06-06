import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { get, snakeCase } from "lodash";
import prisma from "@/lib/prisma";
import stripeApi from "@/lib/stripe/stripe-api";
import { fromUnixTime } from "date-fns";
import { notifyOnSlack } from "@/utils/notifyOnSlack";
import { getTeamDetails } from "@/utils/getTeamDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    // Successfully constructed event.
    console.log("Success:", event.id);

    // Cast event data to Stripe object.
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      console.log(`Charge id: ${charge.id}`);
    } else if (event.type === "customer.subscription.deleted") {
      //cancelled subscription
      const paymentIntent: any = event.data.object as Stripe.PaymentIntent;
      const updatedTeam = await prisma.teams.update({
        where: {
          billingCustomerId: paymentIntent?.customer,
        },
        data: {
          planId: null,
          planName: null,
        },
      });
      const { teamSlug, teamType, plan } = getTeamDetails(updatedTeam);

      notifyOnSlack(
        "Cancelled Plan",
        `*User Cancelled Plan*\n
            Type: ${teamType}\n
            plan: ${plan}\n
            teamSlug: ${teamSlug}\n`
      );

      await prisma.plan_metering.update({
        where: { teamId: updatedTeam.id },
        data: { planId: "", planName: "free" },
      });
    } else if (
      event.type === "customer.subscription.updated" ||
      "customer.subscription.created"
    ) {
      //update plan
      const paymentIntent: any = event.data.object as Stripe.PaymentIntent;

      const planId = get(paymentIntent, "items.data.0.plan.id", "");
      const productId = get(paymentIntent, "items.data.0.plan.product", "");
      const productDetails = await stripeApi.productDetail({ productId });
      const planName = get(productDetails, "name", "");
      const formattedPlanName = snakeCase(planName);

      const updatedTeam = await prisma.teams.update({
        where: {
          billingCustomerId: paymentIntent.customer,
        },
        data: {
          planId: planId,
          planName: formattedPlanName,
        },
      });

      const { teamSlug, teamType } = getTeamDetails(updatedTeam);

      notifyOnSlack(
        "Plan Updated",
        `*User Updated Plan*\n
            Type: ${teamType}\n
            plan: ${formattedPlanName}\n
            planId: ${planId}\n
            teamSlug: ${teamSlug}\n`
      );

      // Insert or Updating the Plan Metering
      await prisma.plan_metering.upsert({
        where: { teamId: updatedTeam.id },
        update: { planId: planId, planName: formattedPlanName },
        create: {
          planId,
          planName: formattedPlanName,
          teamId: updatedTeam.id,
          teamSlug: updatedTeam.slug,
          memberCounter: 1,
        },
      });
    } else if (event.type === "invoice.created") {
      const invoiceDetails: any = event.data.object as Stripe.PaymentIntent;
      let invoiceStatus = "";

      invoiceDetails.paid === true
        ? (invoiceStatus = "paid")
        : (invoiceStatus = "not paid");

      const planId = get(invoiceDetails, "lines.data.0.price.id", "");
      const productId = get(invoiceDetails, "lines.data.0.price.product", "");
      const invoiceUrl = get(invoiceDetails, "lines.", "");
      const periodEndDate = fromUnixTime(invoiceDetails.period_end).toString();
      const periodStartDate = fromUnixTime(
        invoiceDetails.period_start
      ).toString();

      const productDetails = await stripeApi.productDetail({ productId });
      const planName = get(productDetails, "name", "");

      const data = await prisma.invoices.create({
        data: {
          stripeInvoiceId: invoiceDetails.id,
          billingCustomerId: invoiceDetails.customer,
          status: invoiceStatus,
          planId,
          planName,
          periodEndDate,
          periodStartDate,
          totalAmount: invoiceDetails.total.toString(),
        },
      });
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
