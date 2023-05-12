const getTables = async (data: any) => {
  const response = await fetch("/api/integrations/airtable/get-tables", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const tables = await response.json();

  return tables?.data || {};
};

export default getTables;
