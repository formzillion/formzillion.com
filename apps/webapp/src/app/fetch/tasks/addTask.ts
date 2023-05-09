/**
 * This route get the all tasks related to workflowId
 * @param {string} workflowId - workflow Id
 * @param {string} teamId - Task teamId
 * @param {string} appId - Task appId for for associating app with task
 * @param {string} connectionId - Task connectionId for associating connection with task
 * @param {object} template - Task template for custom input
 * @param {string} actionSlug - Task actionSlug
 * @param {string} appSlug - Task appSlug
 * @returns
 */
const addTask = async ({
  workflowId,
  teamId,
  type,
  appId,
  connectionId,
  template = {},
  name,
  actionSlug,
  appSlug,
}: {
  workflowId: string | number;
  teamId: string;
  type: string;
  appId: string;
  connectionId: string;
  template: any;
  name: string;
  actionSlug?: string;
  appSlug?: string;
}) => {
  const response = await fetch("/api/tasks/add-task", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      workflowId,
      teamId,
      type,
      appId,
      connectionId,
      template,
      name,
      actionSlug,
      appSlug,
    }),
  });

  const addTaskResp = await response.json();

  return addTaskResp || {};
};

export default addTask;
