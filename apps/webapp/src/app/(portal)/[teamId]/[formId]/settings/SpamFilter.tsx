"use client";
import React, { useState } from "react";

import { Label } from "@/ui/fields";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { Input } from "@/ui/Input/SimpleInput";
import Header from "@/ui/Header";
import CardFooter from "@/ui/CardFooter";
import Heading from "../../settings/Heading";

export default function SpamFilter({ formDetail }: any) {
  const { spamProvider = "none", spamConfig = {} } = formDetail || {};

  let secretKey;
  if (spamConfig !== null && spamConfig !== undefined) {
    secretKey = Object.values(spamConfig)[0];
  } else {
    secretKey = "";
  }

  const [loading, setLoading] = useState(false);
  const [selectedSpamFilter, setSelectedSpamFilter] = useState(
    spamProvider || "none"
  );

  const [formValues, setFormValues] = useState<any>(secretKey);

  const updateSpamProvider = async (spamData: any) => {
    if (selectedSpamFilter === "none") {
      spamData = "";
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/form/spam-data`,
        {
          method: "POST",
          body: JSON.stringify({
            spamProvider: selectedSpamFilter,
            spamConfig: spamData,
            formId: formDetail.id,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);
      if (data.success === true) {
        showSuccessToast("Updated spam provider successfully");
      }
    } catch (e) {
      setLoading(false);
      showErrorToast("Error while updating spam provider");
    }
  };

  const handleSpamFilterChange = (e: any) => {
    setSelectedSpamFilter(e.target.value);
    setFormValues("");
  };

  const handleKeyChange = (e: any) => {
    setFormValues(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateSpamProvider(formValues);
  };

  return (
    <>
      <div className="p-4 px-6 divide-y divide-gray-300 dark:divide-gray-700">
        <Header title={"Spam Filtering"} />
        <div>
          <Label htmlFor="spamFilter" className="mt-4 ">
            <Heading
              title="Spam Provider"
              description="Filter your submissions for spam using the chosen provider."
            />
          </Label>
          <select
            className="mt-2 appearance-none w-full border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
            name="spamFilter"
            id="spamFilter"
            value={selectedSpamFilter}
            onChange={handleSpamFilterChange}
          >
            <option value="none">None</option>
            <option value="botpoison">Botpoison</option>
            <option value="recaptchav2">Google reCAPTCHA V2</option>
            <option value="recaptchav3">Google reCAPTCHA V3</option>
            <option value="hcaptcha">hCaptcha</option>
            <option value="turnstile">Turnstile</option>
          </select>
        </div>

        {selectedSpamFilter !== "none" && (
          <div>
            <Label className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
              Secret Key
            </Label>
            <div className="mt-1">
              <Input
                type="text"
                name="spamData"
                id="spamData"
                value={formValues}
                onChange={handleKeyChange}
                required
              />
            </div>
          </div>
        )}
      </div>
      <CardFooter
        title={"Learn more about"}
        urlText="Spam Filtering"
        url="https://docs.formzillion.com/setup/spam-protection"
        btnText={"Save"}
        onClick={handleSubmit}
        loading={loading}
      />
    </>
  );
}
