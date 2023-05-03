"use client";
import React, { useCallback, useEffect, useState } from "react";

import BillingHistory from "./BillingHistory";
import PaymentMethod from "./PaymentMethod";
import Subscription from "./Subscription";

interface BillingProps {
  userDetails: any;
}

export default function Billing(props: BillingProps) {
  const { userDetails } = props;
  const [loading, setLoading] = useState<any>(false);
  const [account, setAccount] = useState<any>([]);
  const customerId = userDetails?.billingCustomerId;
  const { planId } = userDetails;
  const getData = useCallback(async () => {
    setLoading(true);

    const response = await fetch("/api/stripe/account", {
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
      <Subscription
        account={account}
        loading={loading}
        userDetails={userDetails}
      />
      <PaymentMethod
        account={account}
        loading={loading}
        userDetails={userDetails}
      />
      <BillingHistory account={account} loading={loading} />
    </>
  );
}
