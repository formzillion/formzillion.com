"use client";
import React, { useState } from "react";

import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { Label } from "@/ui/fields";
import { Input } from "@/ui/Input/SimpleInput";
import Button from "@/ui/Buttons";
import Header from "@/ui/Header";

import SwitchGroup from "./SwitchGroup";
import DeleteForm from "./DeleteForm";
import { useRouter } from "next/navigation";

export default function SettingsForm({ formDetail, formSubmissions }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<any>({
    name: formDetail?.name,
    formEnabled: true,
    submissionArchive: false,
    emailNotifications: false,
  });

  const onClickUpdateField = async (name: any, value: any) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
    try {
      setLoading(true);
      const response = await fetch(`/api/form/${formDetail?.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          [name]: value,
        }),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.success) {
        showSuccessToast("Form Updated Successfully!");
      }
      setLoading(false);
      router.refresh();
    } catch (e) {
      showErrorToast("Error while testing form");
    }
  };

  const onChangeFormName = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFormValues({
      ...formValues,
      name: value,
    });
  };

  return (
    <div className="space-y-5 w-full">
      <div className="divide-y divide-gray-300 dark:divide-gray-700 p-4 px-6 bg-white pt-4 shadow dark:bg-black border border-gray-300 dark:border-gray-700">
        <Header title={"General"} />
        <div className="py-4">
          <div>
            <Label className="dark:text-white">Form Name</Label>
            <div className="mt-1 flex justify-between">
              <Input
                type="text"
                name="name"
                id="name"
                className="w-[80%]"
                value={formValues?.name}
                onChange={onChangeFormName}
              />
              <span className="ml-3">
                <Button
                  loading={loading}
                  type="button"
                  color="secondary"
                  onClick={() => onClickUpdateField("name", formValues?.name)}
                  className="w-[120px] rounded-none"
                >
                  Save Name
                </Button>
              </span>
            </div>
          </div>
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 dark:divide-gray-800"
          >
            <SwitchGroup
              label="Form Enabled"
              description="Choose whether to allow new submissions"
              checked={formValues?.formEnabled}
              onChange={(value: any) =>
                onClickUpdateField("formEnabled", value)
              }
            />
            <SwitchGroup
              label="Submission Archive"
              description="Choose whether to store submissions in Formzillion. If disabled, file upload will not be stored."
              checked={formValues?.submissionArchive}
              onChange={(value: any) =>
                onClickUpdateField("submissionArchive", value)
              }
            />
          </ul>
        </div>
      </div>
      <div className="divide-y divide-gray-300 border border-red-400 dark:border-red-600 shadow dark:divide-gray-700 bg-white  dark:bg-black p-4 px-6">
        <DeleteForm formDetail={formDetail} formSubmissions={formSubmissions} />
      </div>
    </div>
  );
}
