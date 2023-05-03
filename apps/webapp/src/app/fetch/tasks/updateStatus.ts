/**
 * This route get the all tasks related to workflowId
 * @param {string} taskId - Task Id
 * @param {string} status - Task Status (active or  inActive)
 * @returns
 */
const updateStatus = async ({
  taskId,
  status,
}: {
  taskId: number | string | undefined;
  status: string;
}) => {
  const response = await fetch("/api/tasks/update-status", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId, status }),
  });

  const updateResponse = await response.json();

  return updateResponse?.data || {};
};

export default updateStatus;
