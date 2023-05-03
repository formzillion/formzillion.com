/**
 * This route get the all connections related to appId
 * @param {string} appId - app Id
 * @returns
 */
const list = async ({
  appId,
  teamSlug,
}: {
  appId: string;
  teamSlug: string;
}) => {
  const response = await fetch("/api/connections/list", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appId, teamSlug }),
  });

  const connsList = await response.json();

  return connsList?.data || {};
};

export default list;
