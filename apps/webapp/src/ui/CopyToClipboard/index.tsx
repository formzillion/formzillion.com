"use client";
import React from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

import { showSuccessToast } from "@/ui/Toast/Toast";

interface CopyProps {
  text: string;
  className?: string;
}

export default function CopyToClipboard(props: CopyProps) {
  const { text } = props;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    showSuccessToast("Copied successfully");
  };

  return (
    <DocumentDuplicateIcon
      onClick={handleCopy}
      className={classNames(
        "ml-[7px] cursor-pointer text-gray-600 dark:text-gray-300 w-5 h-5 hover:text-gray-700 hover:font-semibold transition-all",
        props.className
      )}
    />
  );
}
