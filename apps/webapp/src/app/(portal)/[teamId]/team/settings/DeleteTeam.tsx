"use client";
import React, { useState } from "react";

import Header from "@/ui/Header";
import DeleteTeamModal from "./DeleteTeamModal";
import Heading from "./Heading";

const DeleteTeam = ({ teamSlug, personalAccount }: any) => {
  const parsedTeam = JSON.parse(teamSlug);
  const [showModal, setShowModal] = useState<any>(false);
  return (
    <div className="space-y-5 w-full">
      <div className="divide-y divide-gray-300 border border-red-400 shadow dark:divide-gray-800 bg-white  dark:bg-black  dark:border-[#EF0A0A]">
        <div className="p-4 px-6 divide-y divide-gray-300">
          <Header title={"Delete Team"} />
          <div className="py-4">
            <Heading
              description="Permanently purge this team and all of the associated resources from
              Formzillion. This action is irreversible, so we advice caution
              before proceeding with this operation."
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="flex bg-[#FC1010] text-white px-8 py-2"
              >
                Delete team
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <DeleteTeamModal
          closeModal={() => {
            setShowModal(false);
          }}
          teamSlug={parsedTeam}
          personalAccount={personalAccount}
        />
      )}
    </div>
  );
};

export default DeleteTeam;
