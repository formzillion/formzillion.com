import React, { Suspense } from "react";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";

import { Tab } from "./Tab";

import { useGetFormDetail } from "./useGetFormDetail";
import FzLoader from "@/components/FzLoader";

const tabs = [
  { name: "Submissions", path: "/", icon: UserIcon, targetSegment: null },
  {
    name: "Reports",
    path: "reports",
    icon: UserIcon,
    targetSegment: "reports",
  },
  {
    name: "Setup",
    path: "setup",
    icon: BuildingOfficeIcon,
    targetSegment: "setup",
  },
  {
    name: "Workflows",
    path: "workflows",
    icon: CreditCardIcon,
    targetSegment: "workflows",
  },
  {
    name: "Settings",
    path: "settings",
    icon: UsersIcon,
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
          <h1 className="text-xl font-light">{formDetail.name}</h1>
          <nav
            className="-mb-2 flex space-x-3  overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent"
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
