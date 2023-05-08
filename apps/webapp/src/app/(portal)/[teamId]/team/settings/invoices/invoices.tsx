import React from "react";
import Stripe from "stripe";
import BillingHistory from "@/app/(portal)/account/billing/BillingHistory";
import stripeApi from "@/lib/stripe/stripe-api";

interface BillingProps {
  userDetails: any;
}

export default async function Invoices(props: BillingProps) {
  const { userDetails } = props;

  const customerId = userDetails?.billingCustomerId;
  const invoices: Stripe.ApiList<Stripe.Invoice> = await stripeApi.listInvoices(
    {
      customerId,
    }
  );

  return (
    <>
      <BillingHistory invoices={invoices.data} />
    </>
  );
}
