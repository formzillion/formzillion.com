"use client";
import {  useState } from "react";
import { isEmpty } from "lodash";
import EmptySubmissions from "./EmptySubmissions";
import TestFormModal from "./settings/TestFormModal";
import SubmissionItem from "./SubmissionItem";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { Button } from "@/ui/Buttons/SButton";


export default function FormsOverviewPage({ formId, formSubmissions }: any) {
  const [showTestFormModal, setShowTestFormModal] = useState(false);
  const toggleTestFormModal = () => setShowTestFormModal(!showTestFormModal);
  const parsedFormSubmissions = JSON.parse(formSubmissions);
  const [submissions, setSubmissions] = useState(parsedFormSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckAll = () => {
    setIsChecked(!isChecked);
  };

  const handleSpamClick = async (isSpam: any) => {
    if (!isEmpty(parsedFormSubmissions)) {
      const filteredSubmissions = parsedFormSubmissions.filter(
        (submission: { isSpam: any }) => submission.isSpam === isSpam
      );
      setSubmissions(filteredSubmissions);
    }
  };

  const handleValueChange = (value:any) => {
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

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);

    const data = new XMLHttpRequest();
    data.open(
      "GET",
      `${process.env.WB_WEBHOOK_URL}/search?q=${event.target.value}`,
      true
    );
    data.onload = function () {
      if (data.status === 200) {
        const response = JSON.parse(data.responseText);
      } else {
        console.error(`Error ${data.status}: ${data.statusText}`);
      }
    };
    data.send();
  };

  const handleFilterTypeChange = (event: any) => {
    setFilterType(event.target.value);
  };

  const filteredData = submissions.filter((obj: any) => {
    if (filterType === "name") {
      return obj.fields.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === "email") {
      return obj.fields.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return false;
    }
  });

  const   updateSpamValue = async (e: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/form-submission/update-spam`,
        {
          method: "POST",
          body: JSON.stringify({
            isSpam: true,
            formId: formId,
          }),
        }
      );

      const data = await response.json();
      if (data.success === true) {
        showSuccessToast("Updated spam vakue successfully");
      }
    } catch (e) {
      showErrorToast("Error while updating spam Value");
    }
  };

  return (
    <div className="flex">
      <div className=" space-y-2 mt-10 cursor-pointer w-[10%]  ">
        <div
          className=" hover:bg-slate-100 hover:text-gray-600 transition-all rounded justify-center text-center"
          onClick={() => handleSpamClick(false)}
        >
          Verified
        </div>
        <div
          className="hover:bg-slate-100 hover:text-gray-600 transition-all rounded text-center"
          onClick={() => handleSpamClick(true)}
        >
          Spam
        </div>
      </div>

      <div className="w-[85%]">
        {submissions?.length > 0 && (
          <div className=" mt-10 justify-between flex flex-row">
            <div className="h-12 w-10 flex items-center justify-center space-x-2 appearance-Sort border   dark:bg-black dark:border-gray-700 border-gray-300  placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200 ">
              <input
                type="checkbox"
                value=""
                required={false}
                id="rememberMe"
                checked={isChecked}
                onChange={handleCheckAll}
                className=""
              />
            </div>
            <select
              value={filterType}
              onChange={handleFilterTypeChange}
              className="  border-gray-300 dark:bg-black dark:border-gray-700"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
            <input
              className="w-[800px] border-gray-300 dark:bg-black dark:border-gray-700"
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={handleInputChange}
            />

            <Menu
              as="div"
              className="relative  text-center  h-[48px] w-[30px] py-3.5 px-1 inline-block  justify-center items-center ring-1 ring-inset ring-gray-300 dark:ring-gray-600 "
            >
              <div>
                <Menu.Button className="flex items-center  bg-gray-100  dark:bg-gray-800  ring-1 ring-inset ring-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                  </svg>
                </Menu.Button>
              </div>

              <Menu.Items className="absolute text-center right-0 z-10 mt-2 w-56 origin-top-right bg-white dark:bg-black shadow-lg  focus:outline-none">
                <div className="py-1" onClick={handleValueChange}>
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

            <Menu
              as="div"
              className="relative inline-block text-left w-[100px] "
            >
              <div>
                <Menu.Button className="flex  justify-center gap-x-1.5  bg-white dark:bg-black dark:text-white px-3 py-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800  hover:bg-gray-50">
                  Actions
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute text-center right-0 z-10 mt-2 w-56 origin-top-right  bg-white dark:bg-black  shadow-lg ring-1 ring-black ring-opacity-5 ">
                  <div className="py-1">
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
                          onClick={updateSpamValue}
                        >
                          Mark as spam
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        className="cursor-pointer text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-200 dark:hover:text-gray-800 dark:text-gray-300 hover:text-black text-center block px-4 py-2 text-sm"
                        onClick={toggleTestFormModal}
                      >
                        Mock submission
                      </div>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}

        <div className="mb-2 flex flex-row justify-between items-center mt-16">
          <h1 className="text-md font-medium text-gray-700 dark:text-gray-300">
            Total Submissions: <span>{submissions?.length}</span>
          </h1>
          {isEmpty(submissions) && (
            <Button onClick={toggleTestFormModal}>Mock Submission</Button>
          )}
        </div>
        <div>
          {!isEmpty(filteredData) ? (
            filteredData?.map((submission: any, idx: any) => {
              return (
                <SubmissionItem
                  key={idx}
                  submission={submission}
                  isChecked={isChecked}
                />
              );
            })
          ) : (
            <EmptySubmissions formId={formId} />
          )}
        </div>
        {showTestFormModal && (
          <TestFormModal
            formId={formId}
            isOpen={showTestFormModal}
            closeModal={toggleTestFormModal}
          />
        )}
      </div>
    </div>
  );
}
