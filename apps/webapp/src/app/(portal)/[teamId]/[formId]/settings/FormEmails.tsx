"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Label } from "@/ui/fields";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import Button from "@/ui/Buttons";
import { Input } from "@/ui/Input/SimpleInput";
import updateEmails from "@/app/fetch/forms/updateEmails";
import toggleEmailNotifications from "@/app/fetch/forms/toggleEmailNotifications";
import FzLoader from "@/components/FzLoader";
import { SwitchButton } from "./SwitchGroup";
import Header from "@/ui/Header";
import Heading from "../../settings/Heading";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { getTeamDetails } from "@/utils/getTeamDetails";
import UpgradePlan from "@/components/UpgradePlan";

export default function FormEmails({ formDetail }: any) {
  const { sendToEmail, id: formId, emailNotifications } = formDetail;
  const currentEmail =
    sendToEmail.length > 1 ? sendToEmail.join(",") : sendToEmail[0];
  const [emails, setEmails] = useState(currentEmail || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { plan, url, disabled } = getTeamDetails(formDetail.team);

  const handleEmailUpdate = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const response = await updateEmails({
      emails,
      formId,
    });

    if (response.success) {
      showSuccessToast("Emails updated!");
      router.refresh();
    } else {
      showErrorToast(`Error while updating emails due to ${response?.message}`);
    }

    router.refresh();
    setLoading(false);
  };

  const handleToggleEmailNotification = async (value: boolean) => {
    setLoading(true);
    const response = await toggleEmailNotifications({
      formId,
      isEnable: value,
      plan,
    });

    if (response.success) {
      showSuccessToast("Emails Notification updated!");
    } else {
      showErrorToast(
        `Error while updating notification status due to ${response?.message}`
      );
    }

    router.refresh();
    setLoading(false);
  };
  return (
    <>
      <div className="p-4 px-6">
        <div className="border-b border-gray-300 dark:border-gray-700">
          <Header title={"Email Notifications"} />
        </div>
        <div className="pt-4 w-full flex justify-between text-start text-base font-medium text-gray-900 dark:text-white">
          <Heading description="Set up email notifications for form submissions" />
          <SwitchButton
            checked={emailNotifications}
            onChange={(value: boolean) => handleToggleEmailNotification(value)}
          />
        </div>
        {loading && <FzLoader />}
        {emailNotifications && (
          <div>
            <Label htmlFor="FormEmails" className="mt-2 ">
              <Heading
                title="Emails"
                description="Get notification to these emails when new form submission is
                received (Enter multiple email addresses separated by commas)."
                plan={plan === "free" && <UpgradePlan url={url} />}
              />
            </Label>
            <Input
              className="mt-2 appearance-none w-full border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
              name="formEmails"
              id="formEmails"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              disabled={disabled}
            ></Input>
          </div>
        )}
      </div>
      <div className="h-12 px-6 bg-slate-50 dark:bg-black flex justify-between items-center">
        <p className="text-sm text-gray-700 dark:text-gray-400">
          Learn more about{" "}
          <a
            className="underline hover:text-gray-700 dark:hover:text-gray-300"
            href={"https://docs.formzillion.com/features/email-notifications"}
            target="_blank"
            rel="noreferrer"
          >
            Email Notifications
            <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
          </a>
        </p>
        {emailNotifications === true && (
          <Button
            loading={loading}
            onClick={handleEmailUpdate}
            className="flex justify-end rounded-none min-w-[80px] h-[30px]"
            disabled={disabled}
          >
            Save
          </Button>
        )}
      </div>
    </>
  );
}
