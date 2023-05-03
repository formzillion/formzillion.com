"use client";
import React from "react";
import Image from "next/image";
import { showSuccessToast } from "@/ui/Toast/Toast";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";

export default function EmptySubmissions({ formId }: any) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/f/${formId}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    showSuccessToast("Copied successfully");
  };
  return (
    <>
      <div className="space-y-2 mt-10 cursor-pointer justify-center flex ">
        <Image
          src={"/empty_forms.svg"}
          alt="Empty Form logo"
          width={250}
          height={250}
        />
      </div>
      <h1 className="text-center mt-4 font-light text-2xl">{`We're waiting to receive your submissions...`}</h1>
      <div className="mt-[18px] text-[15px] justify-center font-medium leading-[18px] flex">
        <p className="truncate">{url}</p>
        <DocumentDuplicateIcon
          onClick={handleCopy}
          className="ml-[2px] w-5 cursor-pointer"
        />
      </div>
    </>
  );
}
