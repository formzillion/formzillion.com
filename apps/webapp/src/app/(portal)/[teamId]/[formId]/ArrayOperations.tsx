"use client";

import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Button } from "@/ui/Buttons/SButton";
import Search from "./Search";

export default function Index({
  checkedIds,
  toggleTestFormModal,
  setIsChecked,
  isChecked,
  submissions,
  setSearchTerm,
  setFilterType,
  searchTerm,
  filterType,
  setData,
  formId,
  toggleExportModal,
  setSubmissions,
}: any) {
  const handleCheckAll = () => {
    setIsChecked(!isChecked);
  };

  const updateSpamValue = async (e: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/form-submission/update-spam`,
        {
          method: "POST",
          body: JSON.stringify({
            isSpam: true,
            id: checkedIds,
          }),
        }
      );

      const data = await response.json();
      if (data.success === true) {
        showSuccessToast("Updated spam value successfully");
      }
    } catch (e) {
      showErrorToast("Error while updating spam Value");
    }
  };

  const fetchData = async (sortBy: any) => {
    const res = await fetch(`/api/form-submission/sort/?sortBy=${sortBy}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formId,
        sortBy,
      }),
    });
    const newData = await res.json();
    setData(newData);
  };

  return (
    <>
      <div className="border border-gray-300 h-[41px] w-[60px] dark:border-gray-700  flex justify-center">
        <input
          type="checkbox"
          value=""
          required={false}
          id="rememberMe"
          onChange={handleCheckAll}
          className="mt-3"
        />
      </div>

      {submissions?.length > 0 && (
        <Search
          setSearchTerm={setSearchTerm}
          setFilterType={setFilterType}
          searchTerm={searchTerm}
          filterType={filterType}
          setData={setData}
          formId={formId}
        />
      )}
      <div className="border border-gray-300 h-[41px] w-[60px] dark:border-gray-700 flex justify-center ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="px-2 py-1">
              <span className="sr-only">Actions</span>
              <ArrowsUpDownIcon className="h-5 w-7" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => fetchData("asc")}>
              Ascending
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => fetchData("desc")}>
              Descending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border border-gray-300 h-[41px] w-[60px] dark:border-gray-700 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="px-2 py-1">
              <span className="sr-only">Actions</span>
              <EllipsisVerticalIcon className="h-5 w-7" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={updateSpamValue}>
              Mark as spam
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleTestFormModal}>
              Mock submission
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleExportModal}>
              Export to CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
