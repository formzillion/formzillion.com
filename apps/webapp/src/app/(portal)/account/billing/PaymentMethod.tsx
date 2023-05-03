/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { PlusIcon } from "@heroicons/react/24/outline";

import AddNewCardModal from "./AddNewCard";
import getStripe from "@/lib/stripe/get-stripejs";

const stripePromise = getStripe();

function PaymentDetail({ paymentMethod }: any) {
  const { card, billing_details, created } = paymentMethod;
  const { brand, last4 } = card || {};
  const lastUpdated = format(new Date(created * 1000), "dd MMM yyyy");

  return (
    <div className=" px-6 py-5 dark:border-gray-900 sm:flex sm:items-start sm:justify-between">
      <h4 className="sr-only">{brand}</h4>
      <div className="sm:flex sm:items-start">
        <img src={`/payments/${brand}.svg`} className="h-8 w-8" alt={brand} />
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
            <span className="capitalize">{brand}</span> •••• {last4}
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:flex sm:items-center">
            <div>Expires Dec 20</div>
            <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
              &middot;
            </span>
            <div className="mt-1 sm:mt-0">Last updated on {lastUpdated}</div>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default function PaymentMethod({ account, loading, userDetails }: any) {
  const paymentMethods = account?.paymentMethods || [];
  const [showAddNewCardModal, setShowAddNewCardModal] = useState<any>(false);

  return (
    <div className="mt-3 bg-white p-4 dark:bg-black border border-gray-500 divide-y divide-gray-800">
      <div>
        <h2
          id="payment-details-heading"
          className="text-lg font-medium leading-6 text-gray-600 dark:text-white"
        >
          Payment Methods
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your billing information. Please note that updating your
          location could affect your tax rates.
        </p>
      </div>
      <div className="mt-3 max-w-5xl space-y-3 ">
        {paymentMethods.map((paymentMethod: any, idx: any) => {
          return <PaymentDetail paymentMethod={paymentMethod} key={idx} />;
        })}
      </div>
      <div className="mt-2">
        <button
          className="button h-9 bg-transparent px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100"
          type="button"
          onClick={() => setShowAddNewCardModal(true)}
        >
          <span className="flex items-center justify-center">
            <PlusIcon className="h-5 w-5" />
            <span className="ml-1">
              <span className="font-medium">Add new card</span>
            </span>
          </span>
        </button>
      </div>

      {showAddNewCardModal && (
        <AddNewCardModal
          userDetails={userDetails}
          stripePromise={stripePromise}
          closeModal={() => {
            setShowAddNewCardModal(false);
          }}
        />
      )}
    </div>
  );
}
