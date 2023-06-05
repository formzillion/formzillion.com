interface ITaskData {
  formId: string;
  teamSlug: string;
  appSlug: string;
  taskSlug: string;
  template: {
    [key: string]: string;
  };
}

/**
 * Creates a task.
 * @param formId The form ID.
 * @param teamSlug The team slug.
 * @param appSlug The app slug.
 * @returns The created task data.
 */
const createTask = async ({
  formId,
  teamSlug,
  appSlug,
  template,
  taskSlug,
}: ITaskData) => {
  const response = await fetch("/api/tasks/create-task", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formId, teamSlug, appSlug, template, taskSlug }),
  });

  const taskCreateResp = await response.json();

  return taskCreateResp?.data || {};
};

export default createTask;
