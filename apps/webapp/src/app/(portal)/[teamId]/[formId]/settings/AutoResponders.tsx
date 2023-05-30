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
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { getTeamDetails } from "@/utils/getTeamDetails";
import UpgradePlan from "@/components/UpgradePlan";

const availableTemplates = ["thankYou", "welcome"];

const SelectTemplate = ({
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
  const [isTemplateEnable, setIsTemplateEnable] = useState(
    selectedTemplate !== ""
  );
  const { plan, url, disabled } = getTeamDetails(formDetail.team);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleConfigUpdate = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    let currentConfig = {};

    if (isTemplateEnable) {
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
      plan,
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
      plan,
    });

    if (!response.success) {
      showErrorToast(
        `Error while toggling auto responder due to ${response?.message}`
      );
    } else {
      showSuccessToast("Auto responder updated");
    }
    router.refresh();
    setLoading(false);
  };

  return (
    <>
      <div className="p-4 px-6 divide-y divide-gray-300 dark:divide-gray-700">
        <Header title={"Autoresponders"} />
        <SwitchGroup
          label="Autoresponders Enable / Disable"
          plan={plan === ("free" || "basic") && <UpgradePlan url={url} />}
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
              checked={isTemplateEnable}
              onChange={(value: boolean) => setIsTemplateEnable(value)}
            />
            {isTemplateEnable ? (
              <SelectTemplate
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            ) : (
              <div className="dark:text-gray-500 text-base">
                Custom auto responders coming soon! For now please utilize the
                templates
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-12 px-6 bg-slate-50 dark:bg-black flex justify-between items-center">
        <p className="text-sm text-gray-700 dark:text-gray-400">
          Learn more about{" "}
          <a
            className="underline hover:text-gray-700 dark:hover:text-gray-300"
            href={"https://docs.formzillion.com/features/autoresponders"}
            target="_blank"
            rel="noreferrer"
          >
            Autoresponders
            <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
          </a>
        </p>
        {autoResponder === true && (
          <Button
            loading={loading}
            onClick={handleConfigUpdate}
            className="flex justify-end rounded-none min-w-[80px] h-[30px]"
          >
            Save
          </Button>
        )}
      </div>
    </>
  );
}
