/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} formId - formId
 * @returns
 */
const getFormSubmissionCount = async ({ formId }: { formId: string }) => {
  const response = await fetch("/api/form-submission/count", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formId }),
  });

  const formSubmissionCount = await response.json();

  return formSubmissionCount.data || "0";
};
export default getFormSubmissionCount;
