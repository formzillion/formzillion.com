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

export default function ExportModal({ formId, closeModal }: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClickCreateForm = async () => {
    router.refresh();
  };

  const handleOnSelect = (value: any) => {};

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
              <p className="text-sm ">Select Date Range</p>
              <Select
                defaultValue={""}
                onValueChange={(value) => handleOnSelect(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select App" />
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
            onClick={onClickCreateForm}
            type="submit"
          >
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
