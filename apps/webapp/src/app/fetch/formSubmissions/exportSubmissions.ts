/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} formId - formId
 * @param {string} exportDays - exportDays
 * @param {string} userEmail - userEmail
 * @returns
 */

const exportSubmissions = async ({
  formId,
  exportDays,
  userEmail,
}: {
  formId: string;
  exportDays: string;
  userEmail: string;
}) => {
  const response = await fetch("/api/form-submission/export-submissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formId, exportDays, userEmail }),
  });

  const submissions = await response.json();

  return submissions || {};
};
export default exportSubmissions;
