/**
 * This route delete the form
 * @param {string} formId - Form Id
 * @returns
 */
const deleteForm = async ({ formId }: { formId: string }) => {
  const response = await fetch("/api/form/delete-form", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formId,
    }),
  });

  const deleteFormResponse = await response.json();

  return deleteFormResponse;
};

export default deleteForm;
