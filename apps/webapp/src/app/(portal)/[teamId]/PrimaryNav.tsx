"use client";

import React from "react";
import { Tab } from "./[formId]/Tab";
import { usePathname } from "next/navigation";

export default function PrimaryNav({ tabs, finalTeamId, formId }: any) {
  const pathName = usePathname();
  const data: any = pathName?.split("/");
  const primary = formId?.includes(data[2]);

  return (
    <>
      {!primary && (
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav
            className="-mb-2 mx-auto max-w-7xl flex space-x-6 overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent"
            aria-label="Tabs"
          >
            {tabs.map((tab: any, idx: number) => (
              <Tab
                name={tab?.name}
                targetSegment={tab?.targetSegment}
                href={`/${finalTeamId}/${tab?.path}`}
                key={idx}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
