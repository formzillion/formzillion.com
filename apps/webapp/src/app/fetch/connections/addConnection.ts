/**
 * This route get the all connections related to appId
 * @param {string} teamSlug - teamSlug required for fetching teamId
 * @param {string} appSlug - appSlug
 * @param {string} apiKey - apiKey
 * @param {string} connectionConfig - connection config
 * @returns
 */
const addConnection = async ({
  teamSlug,
  appSlug,
  connectionConfig,
  formId,
}: {
  teamSlug: string;
  appSlug: string;
  connectionConfig: any;
  formId: string;
}) => {
  const response = await fetch("/api/connections/add-connection", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teamSlug, appSlug, connectionConfig, formId }),
  });

  const connectionAdded = await response.json();

  return connectionAdded || {};
};

export default addConnection;
