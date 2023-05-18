import React from "react";
import { format } from "date-fns";
import { FireIcon } from "@heroicons/react/24/solid";

export default function Subscription({ subscription }: any) {
  const plan = subscription?.plan || {};
  const { name } = plan?.product || {};
  const { amount_decimal = 0, interval = "month" } = plan || {};
  const { current_period_end = 0 } = subscription || {};
  const nextBillingDate = format(current_period_end * 1000, "dd/MMM/yyyy");
  return (
    <div className="space-y-5">
      <div className="bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700">
        <div className="p-4 px-6 flex items-center gap-4">
          <div className="relative rounded-full bg-orange-500 flex h-10 w-10 items-center justify-center">
            <FireIcon className="h-5 w-5 text-white" />
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
                  {current_period_end !== 0 && `USD $${amount_decimal / 100}.00`}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
