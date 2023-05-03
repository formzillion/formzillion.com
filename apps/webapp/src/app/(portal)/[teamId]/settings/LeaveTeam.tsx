"use client";
import React, { useState } from "react";

import Header from "@/ui/Header";
import LeaveTeamModel from "./LeaveTeamModel";
import Heading from "./Heading";

const LeaveTeam = ({ teamSlug }: any) => {
  const parsedTeam = JSON.parse(teamSlug);
  const [showModal, setShowModal] = useState<any>(false);

  return (
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
            className="dark:bg-[#DC8787] dark:text-white px-8 py-2 bg-red-400 text-red-50 hover:bg-red-500 transition-all hover:dark:bg-red-400"
          >
            Leave team
          </button>
        </div>
      </div>
      {showModal && (
        <LeaveTeamModel
          closeModal={() => {
            setShowModal(false);
          }}
          teamSlug={parsedTeam}
        />
      )}
    </div>
  );
};

export default LeaveTeam;
