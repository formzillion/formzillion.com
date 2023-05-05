"use client";

import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import { FaSync } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

export default function Index({
  checkedIds,
  toggleTestFormModal,
  setIsChecked,
  isChecked,
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

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <input
        type="checkbox"
        value=""
        required={false}
        id="rememberMe"
        onChange={handleCheckAll}
      />
      <button onClick={refreshPage}>
        <FaSync
          size={14}
          className="text-gray-500 dark:text-gray-300 h-4 w-4 "
        />
      </button>

      <Menu as="div" className="relative flex items-center">
        <Menu.Button>
          <AdjustmentsHorizontalIcon className="h-4 w-4" />
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
    </>
  );
}
