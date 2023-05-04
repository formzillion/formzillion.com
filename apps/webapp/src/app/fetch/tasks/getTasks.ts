/**
 * This route get the all tasks related to workflowId
 * @param {string} workflowId - workflow Id
 * @param {string} status - status of the task
 * @returns
 */
const list = async ({
  workflowId,
  status = "active",
}: {
  workflowId: string | number | undefined;
  status?: string;
}) => {
  const response = await fetch("/api/tasks/list", {
    method: "POST",
    cache: "no-cache", // TODO: Remove this when raising a PR
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workflowId, status }),
  });

  const tasksList = await response.json();

  return tasksList?.data || {};
};

export default list;
