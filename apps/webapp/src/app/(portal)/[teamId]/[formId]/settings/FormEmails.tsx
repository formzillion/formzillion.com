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

export default function FormEmails({ formDetail }: any) {
  const { sendToEmail, id: formId, emailNotifications } = formDetail;
  const currentEmail =
    sendToEmail.length > 1 ? sendToEmail.join(",") : sendToEmail[0];
  const [emails, setEmails] = useState(currentEmail || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailUpdate = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const response = await updateEmails({
      emails,
      formId,
    });

    if (response.success) {
      showSuccessToast("Emails updated!");
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
      <div className="py-4 w-full flex justify-between text-start text-base font-medium text-gray-900 dark:text-white">
        Email Notifications
        <SwitchButton
          checked={emailNotifications}
          onChange={(value: boolean) => handleToggleEmailNotification(value)}
        />
      </div>
      {loading && <FzLoader />}
      {emailNotifications && (
        <form
          className="py-4 text-gray-800 rounded space-y-4"
          onSubmit={handleEmailUpdate}
        >
          <div>
            <Label htmlFor="FormEmails" className="mt-2 ">
              <b className="text-sm font-medium text-gray-900 dark:text-white">
                Emails
              </b>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notification to these emails when new form submission is
                recived.
              </p>
            </Label>
            <Input
              className="mt-2 appearance-none w-full border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
              name="formEmails"
              id="formEmails"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            ></Input>
          </div>

          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              color="secondary"
              className="w-[80px] rounded-none"
              loading={loading}
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
