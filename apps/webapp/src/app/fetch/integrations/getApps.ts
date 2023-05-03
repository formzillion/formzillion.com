/**
 * This route get the all Apps / Integrations

 * @returns
 */
const list = async () => {
  const response = await fetch("/api/integrations/list", {
    cache: "no-cache", // TODO: Remove this when raising a PR
  });

  const appsList = await response.json();

  return appsList?.data || {};
};

export default list;
