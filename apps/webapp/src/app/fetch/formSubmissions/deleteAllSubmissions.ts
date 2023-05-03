/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} formId - formId
 * @returns
 */
const deleteAllSubmissions = async ({ formId }: { formId: string }) => {
  const response = await fetch(
    "/api/form-submission/delete-submissions",
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formId }),
    }
  );

  const deleteSubmissions = await response.json();

  return deleteSubmissions;
};
export default deleteAllSubmissions;
