const getTags = async (data: any) => {
  const response = await fetch("/api/integrations/convertkit/get-tags", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const tags = await response.json();

  return tags?.data || {};
};

export default getTags;
