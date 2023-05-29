"use client";

import { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaSync } from "react-icons/fa";

import { Button } from "@/ui/Buttons/SButton";
import EmptySubmissions from "./EmptySubmissions";
import SubmissionItem from "./SubmissionItem";
import TestFormModal from "./settings/TestFormModal";
import ArrayOperations from "./ArrayOperations";
import ExportModal from "./ExportModal";

export default function FormsOverviewPage({
  formId,
  formSubmissions,
  userData,
}: any) {
  const [showTestFormModal, setShowTestFormModal] = useState(false);
  const toggleTestFormModal = () => setShowTestFormModal(!showTestFormModal);
  const [showExportModal, setShowExportModal] = useState(false);
  const toggleExportModal = () => setShowExportModal(!showExportModal);
  const parsedFormSubmissions = JSON.parse(formSubmissions);
  const [submissions, setSubmissions] = useState(parsedFormSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [isChecked, setIsChecked] = useState(false);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedIds, setCheckedIds] = useState([]);
  const [count, setCount] = useState();
  const [total, setTotal] = useState();
  const [selectedTab, setSelectedTab] = useState("All");
  const [data, setData] = useState(parsedFormSubmissions);

  const pages = submissions.length;
  const pageLimit = 10;
  const TotalPages = Math.ceil(pages / pageLimit);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/form-submission/list?page=${currentPage}`,
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formId,
      }),
    });
      const data = await res.json();

      setData(data);
    }
    fetchData();
  }, [currentPage, formId]);

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSpamClick = async (isSpam: any) => {
    setSelectedTab(isSpam ? "Spam" : "Verified");
    const status = isSpam ? "spam" : "verify";
    if (!isEmpty(parsedFormSubmissions)) {
      const filteredSubmissions = parsedFormSubmissions.filter(
        (submission: { isSpam: any }) => {
          return submission.isSpam === isSpam;
        }
      );
      const count = filteredSubmissions.length;
      setCount(count);
      setSubmissions(filteredSubmissions);
    }
    setFilter(status);
  };

  const handleSpam = async (isSpam: any) => {
    setSelectedTab(isSpam ? "Spam" : "Verified");
    const status = isSpam ? "spam" : "verify";
    if (!isEmpty(parsedFormSubmissions)) {
      const filteredSubmissions = parsedFormSubmissions.filter(
        (submission: { isSpam: any }) => {
          return submission.isSpam === isSpam;
        }
      );
      const TotalCount = filteredSubmissions.length;
      setTotal(TotalCount);
      setSubmissions(filteredSubmissions);
    }
    setFilter(status);
  };

  const filteredData = data.filter((obj: any) => {
    if (filterType === "name") {
      return obj.fields.name?.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === "email") {
      return obj.fields.email?.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return false;
    }
  });

  const handleSubmission = () => {
    setSelectedTab("All");
    const isSpam = "all";
    if (!isEmpty(parsedFormSubmissions)) {
      setSubmissions(parsedFormSubmissions);
    }
    setFilter(isSpam);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex space-x-8  divide-gray-300 dark:divide-gray-700 px-1 bg-white pt-4 dark:bg-black">
        <div className=" space-y-3 mt-5 cursor-pointer w-[10%]  text-start  ">
          <div
            id="All"
            className={`${
              selectedTab === "All" ? "bg-slate-100 text-gray-600" : ""
            } hover:bg-slate-100 p-2 hover:text-gray-600 dark:hover:bg-slate-300 transition-all rounded flex justify-between`}
            onClick={() => handleSubmission()}
          >
            All
            <div>{parsedFormSubmissions.length}</div>
          </div>
          <div
            id="Spam"
            className={`${
              selectedTab === "Spam" ? "bg-slate-100 text-gray-600" : ""
            } hover:bg-slate-100 p-2 hover:text-gray-600 dark:hover:bg-slate-300 transition-all rounded flex justify-between`}
            onClick={() => handleSpamClick(true)}
          >
            Spam
            <div>{count}</div>
          </div>
          <div
            id="Verified"
            className={`${
              selectedTab === "Verified" ? "bg-slate-100 text-gray-600" : ""
            } hover:bg-slate-100 p-2 hover:text-gray-600 dark:hover:bg-slate-300 transition-all rounded flex justify-between`}
            onClick={() => handleSpam(false)}
          >
            Verified
            <div>{total}</div>
          </div>
        </div>
        <div className="w-[85%] mt-5  shadow dark:bg-black border border-gray-300 dark:border-gray-700 p-4">
          {submissions?.length > 0 && (
            <div className="flex justify-between  ">
              <div className=" flex items-center">
                <ArrayOperations
                  formSubmissions={formSubmissions}
                  checkedIds={checkedIds}
                  setIsChecked={setIsChecked}
                  toggleTestFormModal={toggleTestFormModal}
                  setSubmissions={setSubmissions}
                  isChecked={isChecked}
                  submissions={submissions}
                  setSearchTerm={setSearchTerm}
                  setFilterType={setFilterType}
                  setData={setData}
                  searchTerm={searchTerm}
                  filterType={filterType}
                  formId={formId}
                  toggleExportModal={toggleExportModal}
                />
              </div>
            </div>
          )}
          <div className="text-end mt-6 mb-2 flex justify-between">
            <button onClick={refreshPage}>
              <FaSync
                size={14}
                className="text-gray-500 dark:text-gray-300 h-5 w-7 ml-2"
              />
            </button>
            {submissions.length > 10 && (
              <div className="flex justify-end dark:text-white">
                <button disabled={currentPage === 1} onClick={handlePrev}>
                  <IoIosArrowBack />
                </button>
                <div className="mx-2 rounded-lg border-2 px-2  font-medium dark:border-gray-700">
                  {currentPage} / {TotalPages}
                </div>
                <button
                  disabled={currentPage === TotalPages}
                  onClick={handleNext}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
            {submissions.length <= 0 &&
              filter !== "spam" &&
              filter !== "verify" && (
                <div className="mb-2 flex flex-row justify-end items-center ">
                  {isEmpty(submissions) && (
                    <Button
                      className=" bg-black text-white hover:bg-black hover:text-white"
                      onClick={toggleTestFormModal}
                    >
                      Mock Submission
                    </Button>
                  )}
                </div>
              )}
          </div>

          {!isEmpty(filteredData) && data.length > 0 ? (
            filteredData?.map((submission: any, idx: any) => {
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
          {showExportModal && (
            <ExportModal
              formId={formId}
              isOpen={showExportModal}
              closeModal={toggleExportModal}
              userData={userData}
            />
          )}
        </div>
      </div>
    </>
  );
}
