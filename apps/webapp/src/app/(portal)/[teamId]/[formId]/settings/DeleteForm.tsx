import React, { useState } from "react";
import deleteForm from "@/app/fetch/forms/deleteForm";
import deleteAllSubmissions from "@/app/fetch/formSubmissions/deleteAllSubmissions";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { usePathname, useRouter } from "next/navigation";

export default function DeleteForm({ formDetail, formSubmissions }: any) {
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const redirect = path?.split("/")[1] || "/dashboard";

  const submissionsCount = formSubmissions.length;

  const handleForm = async () => {
    if (submissionsCount === 0) {
      const response = await deleteForm({ formId: formDetail.id });
      if (response.success) {
        showSuccessToast("Form deleted successfully");
      } else {
        showErrorToast(`Failed to delete Form`);
      }
      router.refresh();
      router.push(redirect);
    } else {
      setDisable(true);
      showErrorToast("You cannot delete a form that has submissions");
    }
  };

  const handleSubmission = async () => {
    setLoading(true);
    const response = await deleteAllSubmissions({
      formId: formDetail.id,
    });

    if (response.success) {
      showSuccessToast("Submissions deleted successfully");
    } else {
      showErrorToast(`Failed to delete submissions`);
    }
    router.refresh();
  };

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
              onClick={handleSubmission}
              disabled={loading}
            >
              Delete All Submissions
            </button>
          )}
          <button
            className={`rounded-none flex hover:shadow dark:text-white px-8 py-2 min-w-[80px]  hover:disabled:text-slate-100  dark:bg-red-600 dark:hover:text-white dark:hover:bg-red-700 bg-red-600 text-white disabled:text-white hover:text-white`}
            onClick={handleForm}
            disabled={disable}
          >
            Delete Form
          </button>
        </div>
      </div>
    </>
  );
}
