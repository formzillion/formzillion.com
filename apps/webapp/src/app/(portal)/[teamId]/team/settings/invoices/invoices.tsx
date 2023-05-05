"use client";
import BillingHistory from "@/app/(portal)/account/billing/BillingHistory";
import React, { useCallback, useEffect, useState } from "react";

interface BillingProps {
  userDetails: any;
}

export default function Invoices(props: BillingProps) {
  const { userDetails } = props;
  const [loading, setLoading] = useState<any>(false);
  const [account, setAccount] = useState<any>([]);
  const customerId = userDetails?.billingCustomerId;
  const { planId } = userDetails;
  const getData = useCallback(async () => {
    setLoading(true);

    fetch("/api/stripe/account", {
      method: "POST",
      body: JSON.stringify({
        customerId,
        planId,
      }),
    })
      .then((response) => response.json())
      .then((data) => setAccount(data));
    setLoading(false);
  }, []);

  useEffect(() => {
    getData().then(() => console.log("fetched"));
  }, []);

  return (
    <>
      <BillingHistory account={account} loading={loading} />
    </>
  );
}
