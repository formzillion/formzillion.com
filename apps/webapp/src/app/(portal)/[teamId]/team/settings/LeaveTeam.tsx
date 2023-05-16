"use client";
import React, { useState } from "react";

import Header from "@/ui/Header";
import LeaveTeamModal from "./LeaveTeamModal";
import Heading from "./Heading";

const LeaveTeam = ({ teamSlug, personalAccount }: any) => {
  const parsedTeam = JSON.parse(teamSlug);
  const [showModal, setShowModal] = useState<any>(false);

  return (
    <div className="space-y-5 w-full">
      <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-[#DC8787] dark:divide-gray-800">
        <div className="p-4 px-6 divide-y divide-gray-300">
          <Header title={"Leave Team"} />
          <div className="py-4">
            <Heading
              description="Revoke your access to this Team. Any resources you've added to
          this team will remain"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="dark:text-white px-8 py-2 bg-[#8A5454] text-red-50 hover:bg-red-500 transition-all hover:dark:bg-red-400"
              >
                Leave team
              </button>
            </div>
          </div>
          {showModal && (
            <LeaveTeamModal
              closeModal={() => {
                setShowModal(false);
              }}
              teamSlug={parsedTeam}
              personalAccount={personalAccount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveTeam;
