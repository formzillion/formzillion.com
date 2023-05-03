/**
 * This route get the all tasks related to workflowId
 * @param {string} workflowId - workflow Id
 * @returns
 */
const list = async ({ workflowId }: { workflowId: string | number | undefined }) => {
  const response = await fetch("/api/tasks/list", {
    method: "POST",
    cache: "no-cache", // TODO: Remove this when raising a PR
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workflowId }),
  });

  const tasksList = await response.json();

  return tasksList?.data || {};
};

export default list;
