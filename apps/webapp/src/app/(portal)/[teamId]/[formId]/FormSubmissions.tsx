"use client";

import { useState } from "react";
import { isEmpty } from "lodash";
import classNames from "classnames";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Menu } from "@headlessui/react";
import { Button } from "@/ui/Buttons/SButton";
import Sort from "@/ui/Sort";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import Filter from "@/ui/Filter";

import EmptySubmissions from "./EmptySubmissions";
import SubmissionItem from "./SubmissionItem";
import TestFormModal from "./settings/TestFormModal";

export default function FormsOverviewPage({
  TotalPages,
  formId,
  formSubmissions,
}: any) {
  const [showTestFormModal, setShowTestFormModal] = useState(false);
  const toggleTestFormModal = () => setShowTestFormModal(!showTestFormModal);
  const parsedFormSubmissions = JSON.parse(formSubmissions);
  const [submissions, setSubmissions] = useState(parsedFormSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [isChecked, setIsChecked] = useState(false);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedIds, setCheckedIds] = useState([]);

  const handleSpamClick = async (isSpam: any) => {
    const status = isSpam ? "spam" : "verify";
    if (!isEmpty(parsedFormSubmissions)) {
      const filteredSubmissions = parsedFormSubmissions.filter(
        (submission: { isSpam: any }) => submission.isSpam === isSpam
      );
      setSubmissions(filteredSubmissions);
    }
    setFilter(status);
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

  const handleSubmission = () => {
    const isSpam = "all";
    if (!isEmpty(parsedFormSubmissions)) {
      setSubmissions(parsedFormSubmissions);
    }
    setFilter(isSpam);
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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(TotalPages / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = filteredData.slice(start, end);

  return (
    <>
      <div className="flex space-x-4">
        <div className=" space-y-2 cursor-pointer w-[10%]  text-start">
          <div
            className="hover:bg-slate-100 p-2 hover:text-gray-600 dark:hover:bg-slate-300 transition-all rounded "
            onClick={() => handleSubmission()}
          >
            {" "}
            All
          </div>
          <div
            className="hover:bg-slate-100 p-2 hover:text-gray-600 dark:hover:bg-slate-300 transition-all rounded "
            onClick={() => handleSpamClick(true)}
          >
            {" "}
            Spam
          </div>
          <div
            className=" hover:bg-slate-100 p-2 hover:text-gray-600 transition-all rounded dark:hover:bg-slate-300"
            onClick={() => handleSpamClick(false)}
          >
            {" "}
            Verified
          </div>
        </div>
        <div className="w-[85%]">
          {submissions?.length > 0 && (
            <Filter
              setSearchTerm={setSearchTerm}
              setFilterType={setFilterType}
            />
          )}
          {submissions?.length > 0 && (
            <div className="flex justify-between ml-6">
              <div className="space-x-6 flex items-center">
                <Sort
                  formSubmissions={formSubmissions}
                  checkedIds={checkedIds}
                  setIsChecked={setIsChecked}
                  toggleTestFormModal={toggleTestFormModal}
                  setSubmissions={setSubmissions}
                  isChecked={isChecked}
                />
                <Menu as="div" className="relative py-3.5 px-1 inline-block mt-1" >
                  <Menu.Button>
                    <ArrowsUpDownIcon className="h-4 w-4" />
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
                          > Ascending
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
              <div className="text-end mt-4">
                {submissions.length > 10 && (
                  <div className="flex justify-end dark:text-white">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <IoIosArrowBack />
                    </button>
                    <div className="mx-2 rounded-lg border-2 px-2  font-medium dark:border-gray-700">
                      {currentPage} / {totalPages}
                    </div>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      <IoIosArrowForward />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
            {submissions.length <= 0 && filter !== "spam" && filter !== "verify" && (
                <div className="mb-2 flex flex-row justify-end items-center mt-4">
                  {isEmpty(submissions) && (
                    <Button className=" bg-black text-white hover:bg-black hover:text-white" onClick={toggleTestFormModal}>
                      Mock Submission
                    </Button>
                  )}
                </div>
              )}
            {!isEmpty(currentData) ? (
              currentData?.map((submission: any, idx: any) => {
                return (
                  <SubmissionItem
                    key={idx}
                    submission={submission}
                    isChecked={isChecked}
                    setCheckedIds={setCheckedIds}
                  />
                );
              })
            ) : (
              <EmptySubmissions formId={formId} />
            )}
          {showTestFormModal && (
            <TestFormModal
              formId={formId}
              isOpen={showTestFormModal}
              closeModal={toggleTestFormModal}
            />
          )}
        </div>
      </div>
    </>
  );
}
