"use client";

import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import {  EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import Filter from "../Filter";


export default function Index({
  checkedIds,
  toggleTestFormModal,
  setIsChecked,
  isChecked,
  setSubmissions,
  submissions,
  setSearchTerm,
  setFilterType
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



  const handleValueChange = (value: any) => {
    if (value === "ascending") {
      const sortedSubmissions = [...submissions].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeA - timeB;
      });
      setSubmissions(sortedSubmissions);
    } else if (value === "descending") {
      const sortedSubmissions = [...submissions].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeB - timeA;
      });
      setSubmissions(sortedSubmissions);
    }
  };

  return (
    <>
      <div className="border border-gray-300 h-[42px] w-[60px]  flex justify-center">
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
        <Filter setSearchTerm={setSearchTerm} setFilterType={setFilterType} />
      )}
      <div className="border border-gray-300 h-[42px] w-[60px]  flex justify-center ">
        <Menu as="div" className="relative py-3.5 px-1 inline-block ">
          <Menu.Button>
            <ArrowsUpDownIcon className="h-5 w-7" />
          </Menu.Button>
          <Menu.Items className="absolute top-0 z-10 mt-2 w-56 origin-top-right border bg-white dark:bg-black  shadow-lg ring-1 ring-black ring-opacity-5 ">
            <div onClick={handleValueChange}>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 dark:bg-black dark:hover:bg-slate-200"
                        : "text-gray-700 dark:text-gray-300",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => handleValueChange("ascending")}
                  >
                    {" "}
                    Ascending
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 dark:bg-black dark:hover:bg-slate-200"
                        : "text-gray-700 dark:text-gray-300",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => handleValueChange("descending")}
                  >
                    Descending
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
      <div className="border border-gray-300 h-[42px] w-[60px] flex justify-center">
        <Menu as="div" className="relative flex items-center">
          <Menu.Button>
            <EllipsisVerticalIcon className="h-5 w-7" />
          </Menu.Button>
          <Menu.Items className="absolute top-0 z-10 mt-2 w-56 origin-top-right border bg-white dark:bg-black  shadow-lg ring-1 ring-black ring-opacity-5 ">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-black dark:hover:bg-slate-200"
                      : "text-gray-700 dark:text-gray-300",
                    "block px-4 py-2 text-sm "
                  )}
                  onClick={updateSpamValue}
                >
                  Mark as spam
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              <div
                className="cursor-pointer text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-200 dark:hover:text-gray-800 dark:text-gray-300 hover:text-black block px-4 py-2 text-sm"
                onClick={toggleTestFormModal}
              >
                Mock submission
              </div>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </>
  );
}
