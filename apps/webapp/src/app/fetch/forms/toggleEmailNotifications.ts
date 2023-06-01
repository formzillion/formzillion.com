/**
 * This route updates the emails fields for email notifications
 * @param {string} formId - Form Id
 * @param {boolean} isEnable - boolean
 * @returns
 */
const toggleEmailNotifications = async ({
  formId,
  isEnable,
  plan,
}: {
  formId: string;
  isEnable: boolean;
  plan: string;
}) => {
  const response = await fetch("/api/form/toggle-email-notifications", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formId,
      isEnable,
      plan,
    }),
  });

  const updatedEmailResponse = await response.json();

  return updatedEmailResponse;
};

export default toggleEmailNotifications;
