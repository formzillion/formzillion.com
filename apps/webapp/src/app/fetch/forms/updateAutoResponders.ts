/**
 * This route updates the emails fields for email notifications
 * @param {string} formId - Form Id
 * @param {string} autoResponderConfig - autoResponderConfig for update the config
 * @returns
 */
const updateAutoResponder = async ({
  formId,
  autoResponderConfig,
}: {
  formId: string;
  autoResponderConfig: any;
}) => {
  const response = await fetch("/api/form/update-auto-responders", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formId,
      autoResponderConfig,
    }),
  });

  const autoResponderResponse = await response.json();

  return autoResponderResponse;
};

export default updateAutoResponder;
