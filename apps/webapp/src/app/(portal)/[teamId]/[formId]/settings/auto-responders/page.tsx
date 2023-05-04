import React from "react";
import { PageProps } from "@/types/PageProps";
import { useGetFormDetail } from "../../useGetFormDetail";
import AutoResponders from "../AutoResponders";

export default async function Page({ params }: PageProps) {
  const { formId } = params;
  const formDetail = await useGetFormDetail(formId);
  return (
    <div className="w-full">
      <div className="divide-y divide-gray-300 dark:divide-gray-800 bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700">
        <AutoResponders formDetail={formDetail} />
      </div>
    </div>
  );
}
