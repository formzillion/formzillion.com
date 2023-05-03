"use client";
import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { FireIcon } from "@heroicons/react/24/solid";
import { Card } from "@/ui/Card/SCard";

export default function Subscription({ customerId, planId }: any) {
  const [account, setAccount] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
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

  const subscription = account?.subscriptions?.[0];
  const plan = subscription?.plan || {};
  const { name } = plan?.product || {};
  const { amount_decimal = 0, interval = "month" } = plan || {};
  const { current_period_end = 0 } = subscription || {};
  const nextBillingDate = format(current_period_end * 1000, "dd/MMM/yyyy");

  return (
    <>
      <div className={"flex flex-col sm:flex-row "}>
        <Card className="flex justify-between p-4 py-10">
          <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <div>
                <span className="relative inline-block rounded-full bg-orange-500">
                  <span className="flex h-10 w-10 items-center justify-center">
                    <FireIcon className="h-5 w-5 text-white" />
                  </span>
                </span>
              </div>
              <div>
                <div className="flex items-center">
                  <h6 className="text-base font-semibold text-gray-700 dark:text-white">
                    {name} <span>Plan</span>
                  </h6>
                  <div className=" mx-2 inline-flex items-center rounded-md border-0 bg-emerald-100 px-2 py-1 text-xs font-semibold leading-4 text-emerald-600">
                    <span className="capitalize">active</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span>Billing {interval}ly</span>
                  <span> | </span>
                  <span>
                    {current_period_end === 0
                      ? "Your don't have any current plan "
                      : `Next payment on ${nextBillingDate}`}
                  </span>
                  <span>
                    <span className="mx-1">
                      {current_period_end !== 0 && "for"}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {current_period_end !== 0 &&
                        `USD ${amount_decimal / 100}.00`}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
