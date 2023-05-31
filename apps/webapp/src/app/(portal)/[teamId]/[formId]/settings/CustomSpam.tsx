"use client";
import React, { useState } from "react";

import { Label } from "@/ui/fields";
import { Input } from "@/ui/Input/SimpleInput";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import Header from "@/ui/Header";
import CardFooter from "@/ui/CardFooter";
import Heading from "../../settings/Heading";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { getTeamDetails } from "@/utils/getTeamDetails";
import UpgradePlan from "@/components/UpgradePlan";

export default function CustomSpam({ formDetail }: any) {
  const router = useRouter();
  const { customHoneypot, customSpamWords } = formDetail;
  const [honeypot, setHoneypot] = useState(customHoneypot);
  const [spamWords, setSpamWords] = useState(customSpamWords || []);
  const [loading, setLoading] = useState(false);
  const { plan, url, disabled } = getTeamDetails(formDetail.team);

  const updateCustomSpam = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/form/update-custom-spam`,
        {
          method: "POST",
          body: JSON.stringify({
            customHoneypot: honeypot,
            customSpamWords: spamWords,
            formId: formDetail.id,
            plan,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);
      router.refresh();
      if (!data.success) {
        setLoading(false);
        showErrorToast(
          data.message || "Error while updating custom spam filter"
        );
      }
      if (data.success === true) {
        showSuccessToast("Updated custom spam filter successfully");
      }
    } catch (e) {
      setLoading(false);
      showErrorToast("Error while updating custom spam filter");
    }
  };
  return (
    <>
      <div className="p-4 px-6 divide-y divide-gray-300 dark:divide-gray-700">
        <Header title={"Custom Spam Filtering "} />
        <div>
          <Label
            htmlFor="customHoneypot"
            className="mt-4 text-sm font-medium text-gray-900 dark:text-white"
          >
            <div className="flex">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Custom Honeypot
                <a
                  className="underline hover:text-gray-700 dark:hover:text-gray-300"
                  href={
                    "https://docs.formzillion.com/setup/spam-protection/honeypot"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
                </a>
              </p>
              {plan === ("free" || "basic") && <UpgradePlan url={url} />}
            </div>
          </Label>
          <Input
            name="customHoneypot"
            type="text"
            id="customHoneypot"
            className="mt-1 "
            value={honeypot}
            onChange={(e: any) => setHoneypot(e.target.value)}
            disabled={disabled}
          />

          <Label
            htmlFor="spamWords"
            className="mt-4 text-sm font-medium text-gray-900 dark:text-white"
          >
            <Heading
              title="Custom Spam Words (comma-separated)"
              plan={plan === ("free" || "basic") && <UpgradePlan url={url} />}
            />
          </Label>
          <Input
            name="spamWords"
            type="text"
            id="spamWords"
            className="mt-1"
            placeholder="risk-free, spam, crypto"
            value={spamWords}
            onChange={(e: any) => setSpamWords(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      <CardFooter
        title={"Learn more about"}
        urlText="Custom Spam Words"
        url="https://docs.formzillion.com/setup/spam-protection/custom-spam-words"
        btnText={"Save"}
        onClick={updateCustomSpam}
        loading={loading}
        disabled={disabled}
      />
    </>
  );
}
