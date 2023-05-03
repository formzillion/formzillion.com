/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} formId - formId
 * @returns
 */
const getFormSubmissions = async ({ formId }: { formId: string }) => {
  const formSubmissions = await fetch("/api/form-submission/list", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formId }),
  });

  const jsonData = await formSubmissions.json();

  return jsonData.data || [];
};
export default getFormSubmissions;
