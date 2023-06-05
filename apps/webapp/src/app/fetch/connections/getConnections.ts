/**
 * This route get the all connections related to appId
 * @param {string} appSlug - app Slug
 * @returns
 */
const list = async ({
  appSlug = "",
  teamSlug,
  fetchSingle = false,
}: {
  appSlug?: string;
  teamSlug: string;
  fetchSingle?: boolean;
}) => {
  const url = `/api/connections/${fetchSingle ? "get-connection" : "list"}`;
  const response = await fetch(url, {
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
