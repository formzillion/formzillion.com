/**
 * This route updates the emails fields for email notifications
 * @param {string} formId - Form Id
 * @param {boolean} isEnable - boolean
 * @returns
 */
const toggleAutoResponders = async ({
  formId,
  isEnable,
}: {
  formId: string;
  isEnable: boolean;
}) => {
  const response = await fetch("/api/form/toggle-auto-responders", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formId,
      isEnable,
    }),
  });

  const autoResponderResp = await response.json();

  return autoResponderResp;
};

export default toggleAutoResponders;
