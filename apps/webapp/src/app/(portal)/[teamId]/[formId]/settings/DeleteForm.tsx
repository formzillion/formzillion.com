"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import SubmissionModal from "./SubmissionModal";
import DeleteModal from "./DeleteModal";

export default function DeleteForm({ formDetail, formSubmissions }: any) {
  const [disable, setDisable] = useState(false);
  const [showModal, setShowModal] = useState<any>(false);
  const [deleteModal, setDeleteModal] = useState<any>(false);

  const path = usePathname();
  const redirect = path?.split("/")[1] || "/dashboard";

  const submissionsCount = formSubmissions.length;

  return (
    <>
      <div className="py-4 w-full flex justify-between text-start  text-gray-900 dark:text-white text-lg font-bold">
        Delete Form
      </div>
      <div className="py-4 space-y-2">
        <p className="text-gray-500 text-sm">
          Deleting the form will erase all data associated with it, including
          submissions, will be permanently erased and unrecoverable.
        </p>
        <p className="text-gray-700 pt-4 text-sm">
          Total form submissions : {submissionsCount}
        </p>
        <p className="text-gray-500 text-sm">
          If you wish to proceed, you must first delete all of your submissions.
          After the submissions have been deleted, you may then proceed to
          delete your form.
        </p>
        <div className="flex justify-end mt-4 space-x-4">
          {submissionsCount > 0 && (
            <button
              className="rounded-none flex border hover:border-red-600 hover:text-red-700 hover:shadow border-red-400 text-red-600 dark:text-white px-8 py-2 min-w-[80px] disabled:border-red-300 disabled:text-red-500 hover:disabled:border-red-300 hover:disabled:text-red-500 dark:bg-black dark:border-red-600 dark:hover:border-red-700 dark:hover:text-red-700"
              onClick={() => setShowModal(true)}
            >
              Delete All Submissions
            </button>
          )}
          {showModal && (
            <SubmissionModal
              closeModal={() => {
                setShowModal(false);
              }}
              formDetail={formDetail}
            />
          )}

          <button
            className={`rounded-none flex hover:shadow dark:text-white px-8 py-2 min-w-[80px]  hover:disabled:text-slate-100  dark:bg-red-600 dark:hover:text-white dark:hover:bg-red-700 bg-red-600 text-white disabled:text-white hover:text-white`}
            onClick={() => setDeleteModal(true)}
          >
            Delete Form
          </button>
          {deleteModal && (
            <DeleteModal
              closeModal={() => {
                setDeleteModal(false);
              }}
              formDetail={formDetail}
              redirect={redirect}
            />
          )}
        </div>
      </div>
    </>
  );
}
