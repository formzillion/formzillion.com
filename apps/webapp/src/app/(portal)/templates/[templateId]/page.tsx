import React from "react";
import Link from "next/link";
import { toInteger } from "lodash";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { PageProps } from "@/types/PageProps";
import Button from "@/ui/Buttons";
import CodeBlock from "@/ui/Code";

import { getFormcontent } from "./getFormContent";
import TemplateForm from "./TemplateForm";
import { templates } from "../data";

export default function Page({ params }: PageProps) {
  const templateId = params.templateId;
  const data = templates.find((item) => item.id === toInteger(templateId));

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-4">
          <Link href="/templates">
            <ArrowLeftIcon className="h-5 w-5 cursor-pointer dark:text-gray-300" />
          </Link>
          <div>
            <h3 className="text-2xl font-normal text-gray-600 dark:text-gray-300">
              {data?.name}
            </h3>
            <h6 className="dark:text-gray-400">Template</h6>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 mt-4 space-x-2">
        <TemplateForm data={data} />
        <div className="col-span-4">
          <p className="text-gray-500 text-xs">
            Note: Please note that styles are not included in the code. You will
            need to add your own styles.
          </p>
          <CodeBlock
            content={getFormcontent({ templateId: toInteger(templateId) })}
            lang="html"
          />
        </div>
      </div>
    </div>
  );
}
