import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

import Button from "@/ui/Buttons";
import Header from "@/ui/Header";
import Subscription from "./Subscription";
import Heading from "../Heading";

interface BillingProps {
  userDetails: any;
  teamSlug: string;
  subscription: any;
}

export default function Billing(props: BillingProps) {
  const { userDetails, teamSlug, subscription } = props;
  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${teamSlug}/settings/billing`;
  const customerId = userDetails?.billingCustomerId;
  const billingSessionLink = `/api/stripe/customer-portal-section?customerId=${customerId}&redirectUrl=${redirectUrl}`;

  return (
    <>
      <Subscription subscription={subscription} />
      <div className="space-y-5">
        <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
          <div className="p-4 px-6 divide-y divide-gray-300 dark:divide-gray-700">
            <Header title={"Manage and view your billing information."} />
            <div className="flex justify-between items-center pt-4">
              <Heading
                description="View and edit your billing details, as well as cancel your
                subscription."
              />
              <div>
                <a href={billingSessionLink} target="_blank" rel="noreferrer">
                  <Button className={"min-w-[150px]"}>
                    Billing Portal &nbsp;
                    <ArrowTopRightOnSquareIcon className="w-4 text-white" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
