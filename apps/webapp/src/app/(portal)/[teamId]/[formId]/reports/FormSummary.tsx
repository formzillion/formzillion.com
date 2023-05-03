"use client";
import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import { useEffect, useState } from "react";

export default function FormSummary({
  formId,
  type,
  groupBy,
  title,
  subTitle,
}: any) {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    const response = await fetch(`/api/form-submission/summary`, {
      method: "POST",
      body: JSON.stringify({
        formId,
        type,
        groupBy,
        skip: 0,
        limit: 10,
      }),
    });
    const jsonData = await response.json();

    setSummaryData(jsonData.data);
  };

  return (
    <Card className="dark:bg-black dark:border-gray-900 dark:ring-gray-800">
      <Title className="dark:text-gray-200">{title}</Title>
      <Subtitle className="dark:text-gray-200">{subTitle}</Subtitle>
      <BarChart
        className="h-72 mt-4 dark:text-gray-200"
        data={summaryData}
        index="_id"
        categories={["totalSubmissions"]}
        colors={["orange"]}
        yAxisWidth={12}
      />
    </Card>
  );
}
