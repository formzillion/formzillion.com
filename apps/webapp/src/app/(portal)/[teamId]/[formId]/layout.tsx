import React, { Suspense } from "react";
import { Tab } from "./Tab";
import { useGetFormDetail } from "./useGetFormDetail";
import FzLoader from "@/components/FzLoader";
import { startCase } from "lodash";

const tabs = [
  { name: "Submissions", path: "/", targetSegment: null },
  {
    name: "Analytics",
    path: "analytics",
    targetSegment: "analytics",
  },
  {
    name: "Setup",
    path: "setup",
    targetSegment: "setup",
  },
  {
    name: "Integrations",
    path: "integrations",
    targetSegment: "integrations",
  },
  {
    name: "Settings",
    path: "settings",
    targetSegment: "settings",
  },
];

interface FormDetailPageProps {
  children: any;
  params: {
    formId: string;
    teamId: string;
  };
}

export default async function FormDetailLayout({
  children,
  params,
}: FormDetailPageProps) {
  const formId = params.formId;
  const teamId = params.teamId;
  const formDetail = (await useGetFormDetail(formId)) || [];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-light flex items-center">
            {startCase(formDetail.name)}&nbsp;
            <span className="bg-orange-200 text-xs dark:text-black px-3 py-[2px] rounded-full ">
              Form
            </span>
          </h1>
          <nav
            className="-mb-2 flex space-x-3 max-w-[70%] overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent"
            aria-label="Tabs"
          >
            {tabs.map((tab, idx) => (
              <Tab
                name={tab?.name}
                targetSegment={tab?.targetSegment}
                href={`/${teamId}/${formId}/${tab.path}`}
                key={idx}
              />
            ))}
          </nav>
        </div>
      </div>
      <Suspense fallback={<FzLoader />}>
        <div className="rounded py-4 mx-auto max-w-7xl">
          {React.cloneElement(children, { formDetail: formDetail })}
        </div>
      </Suspense>
    </div>
  );
}
