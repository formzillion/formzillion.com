"use client";
import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import Button from "@/ui/Buttons";

interface FooterProps {
  title?: string;
  urlText?: string;
  url?: string;
  btnText?: string;
  onClick?: React.MouseEvent | any;
  loading?: boolean;
  type?: string;
  disabled?: boolean;
}

export default function CardFooter(props: FooterProps) {
  const {
    title,
    urlText,
    url,
    btnText,
    onClick,
    loading,
    type = "button",
    disabled,
  } = props;
  return (
    <div className="h-12 px-6 bg-slate-50 dark:bg-black flex justify-between items-center">
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {title}{" "}
        {urlText && (
          <a
            className="underline hover:text-gray-700 dark:hover:text-gray-300"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {urlText}
            <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
          </a>
        )}
      </p>
      {btnText && (
        <Button
          type={type}
          loading={loading}
          onClick={onClick}
          disabled={disabled}
          className="flex justify-end rounded-none min-w-[80px] text-sm h-9"
        >
          {btnText}
        </Button>
      )}
    </div>
  );
}
