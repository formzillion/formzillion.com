import React from "react";
import Stripe from "stripe";
import BillingHistory from "@/app/(portal)/account/billing/BillingHistory";

interface BillingProps {
  invoices: any;
}

export default function Invoices(props: BillingProps) {
  const { invoices } = props;

  return (
    <>
      <BillingHistory invoices={invoices.data} />
    </>
  );
}
