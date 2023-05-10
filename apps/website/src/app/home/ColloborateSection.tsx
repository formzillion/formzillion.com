import Image from "next/image";
import React from "react";

import members from "public/screenshots/workspace-members.png";
export default function ColloborateSection() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-gray-50 rounded-md p-4 sm:p-8 md:p-12">
        <div className="max-w-lg p-1 sm:p-2 md:p-4">
          <h3 className="text-2xl text-gray-900 font-semibold mb-3 md:mb-6">
            Collaborate
          </h3>
          <div className="text-lg text-gray-700">
            <div className="flex py-2">
              <div className="text-gray-300 pr-2">•</div>
              <div>Invite members to your workspace</div>
            </div>
            <div className="flex py-2">
              <div className="text-gray-300 pr-2">•</div>
              <div>Create forms and view submission as a team</div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src={members}
            alt="Workspace members"
            aria-label="Workspace members"
            className="border rounded-md shadow-md"
          />
        </div>
      </div>
    </>
  );
}
