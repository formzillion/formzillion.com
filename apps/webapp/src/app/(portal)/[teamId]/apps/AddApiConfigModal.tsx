"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { startCase } from "lodash";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import { Input } from "@/ui/Input/SimpleInput";
import Button from "@/ui/Buttons";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import addConnection from "../../../fetch/connections/addConnection";

const appConfigFields = {
  webhooks: ["connectionName", "webhooksEndpoint"],
} as { [key: string]: string[] };

export default function AddApiConfigModal({
  closeModal,
  teamSlug,
  appName,
  appSlug,
}: any) {
  const configFields: any = {};
  const currentConfig = appConfigFields[appSlug] || [
    "connectionName",
    "apiKey",
  ];
  currentConfig.forEach((field) => (configFields[field] = ""));
  const [connectionConfig, setConnectionConfig] = useState(configFields);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async () => {
    const allFieldsFilled = Object.values(connectionConfig).every(
      (field) => field !== ""
    );
    if (allFieldsFilled) {
      setLoading(true);
      const response = await addConnection({
        connectionConfig,
        appSlug,
        teamSlug,
      });

      if (response.success) {
        showSuccessToast("Successfully added the api key!");
        closeModal();
      } else {
        showErrorToast(`Failed to add the api key due to ${response?.message}`);
      }
      router.refresh();
      setLoading(false);
    } else {
      showErrorToast("Please fill all the fields");
    }
  };

  const handleConnectionDetails = (field: string, value: string) => {
    setConnectionConfig({ ...connectionConfig, [field]: value });
  };

  return (
    <Dialog open={closeModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Connection Details</DialogTitle>
          <DialogDescription className="text-gray-600">
            These details helps us to perform actions for {appName}
          </DialogDescription>
        </DialogHeader>
        {currentConfig?.map((field) => (
          <div className="space-y-4 py-2 pb-4" key={field}>
            <div className="space-y-2">
              <label htmlFor={field}>
                {field.includes("apiKey") ? "API Key" : startCase(field)}
              </label>
              <Input
                type="text"
                name={field}
                id={field}
                autoComplete={field}
                value={connectionConfig[field]}
                onChange={(e) => handleConnectionDetails(field, e.target.value)}
              />
            </div>
          </div>
        ))}
        <DialogFooter>
          <Button
            loading={loading}
            className="bg-orange-600 text-white rounded-none"
            onClick={handleOnSubmit}
            type="submit"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
