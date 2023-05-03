import React from "react";
import { format } from "date-fns";
import { FireIcon } from "@heroicons/react/24/solid";

export default function Subscription({ account, loading }: any) {
  const subscription = account?.subscriptions?.[0];
  const plan = subscription?.plan || {};
  const { name } = plan?.product || {};
  const { amount_decimal = 0, interval = "month" } = plan || {};
  const { current_period_end = 0 } = subscription || {};
  const nextBillingDate = format(current_period_end * 1000, "dd/MMM/yyyy");

  return (
    <div className="mt-3 p-4 border border-gray-500 divide-y divide-gray-800">
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-600 dark:text-white">
          Subscription
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Current Subscription details
        </p>
      </div>
      <div className="mt-2 max-w-5xl  p-4 sm:flex sm:items-start sm:justify-between ">
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <div>
              <span className="relative inline-block rounded-full bg-emerald-500">
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
                    {current_period_end !== 0 && `US${amount_decimal / 100}.00`}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <button className="button radius-round h-9 border border-transparent rounded-md bg-transparent px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100">
              Cancel plan
            </button>
            <button className="button radius-round ml-2 h-9 border rounded-md border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100">
              Update Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
