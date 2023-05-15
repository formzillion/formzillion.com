"use client";
import React, { useState } from "react";
import { map, startCase } from "lodash";
import { randFullName, randEmail, randQuote } from "@ngneat/falso";
import { useRouter } from "next/navigation";

import Modal, { ModalTitle } from "@/components/Modal";
import Button from "@/ui/Buttons";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { Input, Label } from "@/ui/fields";
import DynamicField from "../DynamicFields";

export default function TestFormModal({ formId, closeModal }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [test, testData] = useState<any>([]);
  const [submitCount, setSubmitCount] = useState(1);
  const [formValues, setFormValues] = useState<any>({
    name: randFullName({ withAccents: false }),
    email: randEmail(),
    message: randQuote(),
  });

  let dynamicFields: any = {};
  test.forEach(
    (field: any) =>
      (dynamicFields[field.keyName?.toLowerCase()] = field.keyValue)
  );

  const onClickTestForm = async () => {
    try {
      setLoading(true);

      const formSubmissionValues = [...Array(Number(submitCount))].map(() => ({
        name: randFullName({ withAccents: false }),
        email: randEmail(),
        message: randQuote(),
      }));

      if (submitCount === 1) {
        const formData = new FormData();
        const currentValues = { ...formValues, ...dynamicFields };
        for (const key in currentValues) {
          formData.append(key, currentValues[key]);
        }
        await fetch(`/f/${formId}`, { method: "POST", body: formData });
      } else {
        for (const formValues of formSubmissionValues) {
          const currentValues: any = { ...formValues, ...dynamicFields };
          const formData = new FormData();
          for (const key in formValues) {
            formData.append(key, currentValues[key]);
          }

          await fetch(`/f/${formId}`, { method: "POST", body: formData });
        }
      }
      router.refresh();
      setLoading(false);
      closeModal();
      showSuccessToast("Test form submitted!");
    } catch (e) {
      showErrorToast("Error while testing form");
    }
  };

  const onChangeField = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Modal isOpen={true} toggle={() => closeModal()}>
      <ModalTitle title="Test Form" toggle={() => closeModal()} />

      <div className="space-y-6 p-4 sm:space-y-5">
        {map(formValues, (value, key) => {
          return (
            <div
              className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-gray-200 sm:pt-5"
              key={key}
            >
              <Label>{startCase(key)}</Label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Input
                  type="text"
                  name={key}
                  autoComplete={key}
                  value={value}
                  onChange={onChangeField}
                />
              </div>
            </div>
          );
        })}
        <DynamicField testData={testData} />
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type={"range"}
              value={submitCount}
              min={1}
              max={10}
              onChange={(e: any) => setSubmitCount(e.target.value)}
            />
            <span>{submitCount}</span>
          </div>
          <Button
            loading={loading}
            className="ml-2 inline-flex justify-center rounded-none border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-w-[95px]"
            onClick={onClickTestForm}
          >
            Test Form
          </Button>
        </div>
      </div>
    </Modal>
  );
}
