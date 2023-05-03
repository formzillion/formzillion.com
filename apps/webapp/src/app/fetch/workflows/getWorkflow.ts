/**
 * This route get the worflow details for the formId
 * @param {string} formId - team Name
 * @returns
 */
const details = async ({ formId }: { formId: string }) => {
  const response = await fetch("/api/workflow/details", {
    method: "POST",
    cache: "no-cache", // TODO: Remove this when raising a PR
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formId }),
  });

  const workflowDetails = await response.json();

  return workflowDetails?.data || {};
};

export default details;
