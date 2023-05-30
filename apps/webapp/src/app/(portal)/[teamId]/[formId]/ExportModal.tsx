"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import Button from "@/ui/Buttons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import exportSubmissions from "@/app/fetch/formSubmissions/exportSubmissions";
import {
  showErrorToast,
  showSuccessToast,
  toastMessages,
} from "@/ui/Toast/Toast";
import { usePathname } from "next/navigation";
import { getExportModelData } from "@/utils/getTeamDetails";
import UpgradePlan from "@/components/UpgradePlan";

export default function ExportModal({ formId, closeModal, userData }: any) {
  const pathName = usePathname();
  const parsedUserData = JSON.parse(userData);

  let { disabled, url, plan } = getExportModelData(parsedUserData, pathName);

  const { email } = parsedUserData;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [exportDays, setExportDays] = useState("");
  const onClickExport = async () => {
    setLoading(true);
    const res = await exportSubmissions({
      formId,
      exportDays,
      userEmail: email,
      plan,
    });
    if (res.success) {
      setLoading(false);
      showSuccessToast(
        "Successfully exported data. You should receive an email shortly with your data."
      );
    } else {
      setLoading(false);
      showErrorToast(res.message || toastMessages.error);
    }
    router.refresh();
  };

  const handleOnSelect = (value: any) => {
    setExportDays(value);
  };

  const dateOptions: any = [
    {
      name: "1 Day",
      value: "1",
    },
    {
      name: "Last 7 Days",
      value: "7",
    },
    {
      name: "Last 30 Days",
      value: "30",
    },
    {
      name: "Last 60 Days",
      value: "60",
    },
    {
      name: "Last 90 Days",
      value: "90",
    },
  ];

  return (
    <Dialog open={closeModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription className="text-gray-600">
            You will receive the CSV file once you export.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <ul className="list-disc text-sm text-gray-600">
                <li>
                  The data will be sent to your registered email in a
                  downloadable file.
                </li>
                <li>
                  {`Processing may take some time. You'll be notified when it's
                  ready.`}
                </li>
              </ul>
              <div className="flex mt-4">
                <p className="text-sm">Select Date Range</p>
                {plan === ("free" || "basic") && <UpgradePlan url={url} />}
              </div>
              <Select
                defaultValue={""}
                onValueChange={(value) => handleOnSelect(value)}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {dateOptions?.map((option: any) => {
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            loading={loading}
            className="bg-orange-600 text-white rounded-none min-w-[80px]"
            onClick={onClickExport}
            type="submit"
            disabled={disabled}
          >
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
