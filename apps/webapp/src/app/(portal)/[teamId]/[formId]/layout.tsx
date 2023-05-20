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
import Sidebar from "./Sidebar";

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
  const allForms = await prisma.forms.findMany({
    where: { team: { slug: teamId } },
    orderBy: {
      createdAt: "desc",
    },
  });
  const forms = JSON.stringify(allForms);
  return (
    <div>
      <div>
        <div className="flex mx-auto space-x-8 p-4 ml-20">
          <Sidebar forms={forms} />
          <div className="rounded mx-auto max-w-7xl">
            <nav
              className="-mb-2 justify-end sm:px-6 flex space-x-3  overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent"
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
            <Suspense fallback={<FzLoader />}>
              {React.cloneElement(children, { formDetail: formDetail })}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
