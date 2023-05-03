"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { startCase } from "lodash";

import { Label, SelectField } from "@/ui/fields";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import Button from "@/ui/Buttons";
import toggleAutoResponders from "@/app/fetch/forms/toggleAutoResponders";
import updateAutoResponder from "@/app/fetch/forms/updateAutoResponders";
import Header from "@/ui/Header";
import SwitchGroup from "./SwitchGroup";
import FzLoader from "@/components/FzLoader";

const availableTemplates = ["thankYou", "welcome"];

const SelectTemplete = ({
  selectedTemplate,
  setSelectedTemplate,
}: {
  selectedTemplate: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <Label htmlFor="autoResponders" className="my-2 ">
        <b className="text-sm font-medium text-gray-900 dark:text-white">
          Templates
        </b>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select the templates to be used for auto responder
        </p>
      </Label>
      <SelectField
        name=""
        options={availableTemplates.map((f) => ({
          label: startCase(f),
          value: f,
        }))}
        defaultValue={selectedTemplate}
        onChange={(e: any) => setSelectedTemplate(e.target.value)}
      />
    </div>
  );
};

export default function AutoResponders({ formDetail }: any) {
  const { id: formId, autoResponder, autoResponderConfig = {} } = formDetail;
  const [selectedTemplate, setSelectedTemplate] = useState(
    autoResponderConfig?.template || ""
  );
  const [isTempleteEnable, setIsTempleteEnable] = useState(
    selectedTemplate !== ""
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleConfigUpdate = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    let currentConfig = {};

    if (isTempleteEnable) {
      currentConfig = {
        template:
          selectedTemplate !== "" ? selectedTemplate : availableTemplates[0],
      };
    } else {
      currentConfig = {};
    }
    const response = await updateAutoResponder({
      formId,
      autoResponderConfig: currentConfig,
    });

    if (response.success) {
      showSuccessToast("Auto responders data updated!");
    } else {
      showErrorToast(
        `Error while updating Auto responders data due to ${response?.message}`
      );
    }

    router.refresh();
    setLoading(false);
  };

  const handleDisableAutoResponder = async (isEnable: boolean) => {
    setLoading(true);
    const response = await toggleAutoResponders({
      formId,
      isEnable,
    });

    if (!response.success) {
      showErrorToast(
        `Error while toggling auto responder due to ${response?.message}`
      );
    }

    router.refresh();
    setLoading(false);
    showSuccessToast("Auto responder updated");
  };

  return (
    <>
      <Header title={"Autoresponders"} />
      <SwitchGroup
        label="Autoresponders Enabled"
        description="To set up an autoresponder, you can enable this button."
        checked={autoResponder}
        onChange={(value: boolean) => handleDisableAutoResponder(value)}
      />
      {loading && <FzLoader />}
      {autoResponder && (
        <div>
          <SwitchGroup
            label="Use Template"
            description="Predefined templates are available you can use in your autoresponder."
            checked={isTempleteEnable}
            onChange={(value: boolean) => setIsTempleteEnable(value)}
          />
          <form
            className="text-gray-800 rounded space-y-4 "
            onSubmit={handleConfigUpdate}
          >
            {isTempleteEnable ? (
              <SelectTemplete
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            ) : (
              <div className="dark:text-gray-500 text-base">
                Custom auto responders coming soon! For now please utilize the
                templetes
              </div>
            )}
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
        </div>
      )}
    </>
  );
}
