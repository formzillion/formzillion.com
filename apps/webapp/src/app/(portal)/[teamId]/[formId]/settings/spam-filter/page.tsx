import React from "react";
import { PageProps } from "@/types/PageProps";
import { useGetFormDetail } from "../../useGetFormDetail";
import SpamFilter from "../SpamFilter";
import CustomSpam from "../CustomSpam";

export default async function Page({ params }: PageProps) {
  const { formId } = params;
  const formDetail = await useGetFormDetail(formId);
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="divide-y divide-gray-300 dark:divide-gray-800 bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700">
        <SpamFilter formDetail={formDetail} />
      </div>
      <div className="divide-y divide-gray-300 dark:divide-gray-800 bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700">
        <CustomSpam formDetail={formDetail} />
      </div>
    </div>
  );
}
