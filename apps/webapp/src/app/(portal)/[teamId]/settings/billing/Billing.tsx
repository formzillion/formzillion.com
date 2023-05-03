import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Button from "@/ui/Buttons";
import { Card, CardDescription, CardTitle } from "@/ui/Card/SCard";
import Subscription from "./Subscription";

interface BillingProps {
  userDetails: any;
  teamSlug: string;
}

export default function Billing(props: BillingProps) {
  const { userDetails, teamSlug } = props;
  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${teamSlug}/settings/billing`;
  const customerId = userDetails?.billingCustomerId;
  const { planId } = userDetails;
  const billingSessionLink = `/api/stripe/customer-portal-section?customerId=${customerId}&redirectUrl=${redirectUrl}`;
  return (
    <>
      <Subscription customerId={customerId} planId={planId} />
      <div>
        <div className={"flex flex-col sm:flex-row mb-10"}>
          <Card className="flex justify-between p-4 py-10">
            <div>
              <CardTitle className="mb-3">
                Manage and view your billing information.
              </CardTitle>
              <CardDescription>
                View and edit your billing details, as well as cancel your
                subscription.
              </CardDescription>
            </div>
            <div className=" pt-3 sm:ml-auto sm:pt-0 sm:pl-3">
              <a href={billingSessionLink} target="_blank" rel="noreferrer">
                <Button>
                  Billing Portal &nbsp;
                  <ArrowTopRightOnSquareIcon className="w-4 text-white" />
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
