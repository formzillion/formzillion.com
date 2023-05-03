"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { startCase } from "lodash";

import { BreadcrumbSeparator } from "./shared/Navbar";

export default function FormId() {
  const params = useSearchParams();
  const formName: any = params?.get("formName");

  return (
    <>
      {formName ? (
        <>
          <BreadcrumbSeparator />
          <span className="dark:text-white text-gray-800">{startCase(formName)}</span>
        </>
      ) : (
        ""
      )}
    </>
  );
}
