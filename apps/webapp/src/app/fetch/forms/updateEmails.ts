/**
 * This route updates the emails fields for email notifications
 * @param {string} formId - Form Id
 * @param {string} emails - emails
 * @returns
 */
const updateEmails = async ({
  formId,
  emails,
}: {
  formId: string;
  emails: string[];
}) => {
  const response = await fetch("/api/form/update-emails", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formId,
      emails,
    }),
  });

  const updatedEmailResponse = await response.json();

  return updatedEmailResponse;
};

export default updateEmails;
