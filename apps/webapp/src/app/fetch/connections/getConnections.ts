/**
 * This route get the all connections related to appId
 * @param {string} appSlug - app Slug
 * @returns
 */
const list = async ({
  appSlug = "",
  teamSlug,
}: {
  appSlug?: string;
  teamSlug: string;
}) => {
  const response = await fetch("/api/connections/list", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appSlug, teamSlug }),
  });

  const connsList = await response.json();

  return connsList?.data || {};
};

export default list;
