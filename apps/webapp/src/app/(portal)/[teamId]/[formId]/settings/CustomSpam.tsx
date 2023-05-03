"use client";
import React, { useState } from "react";

import Button from "@/ui/Buttons";
import { Label } from "@/ui/fields";
import { Input } from "@/ui/Input/SimpleInput";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import Header from "@/ui/Header";

export default function CustomSpam({ formDetail }: any) {
  const { customHoneypot, customSpamWords } = formDetail;
  const [honeypot, setHoneypot] = useState(customHoneypot);
  const [spamWords, setSpamWords] = useState(customSpamWords || []);
  const [loading, setLoading] = useState(false);

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
          }),
        }
      );

      const data = await response.json();
      setLoading(false);
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
      <Header title={"Custom Spam Filtering "} />
      <form
        onSubmit={updateCustomSpam}
        className="py-4 text-gray-800 rounded space-y-4"
      >
        <div>
          <Label className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            Custom Honeypot
          </Label>
          <Input
            name="customHoneypot"
            type="text"
            id="customHoneypot"
            className="mt-1 "
            value={honeypot}
            onChange={(e: any) => setHoneypot(e.target.value)}
          />
        </div>
        <div>
          <Label className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            Custom Spam Words (comma-separated)
          </Label>
          <Input
            name="spamWords"
            type="text"
            id="spamWords"
            className="mt-1"
            placeholder="risk-free, spam, crypto"
            value={spamWords}
            onChange={(e: any) => setSpamWords(e.target.value)}
          />
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
    </>
  );
}
