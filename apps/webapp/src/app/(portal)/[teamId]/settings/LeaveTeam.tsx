"use client";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/Card/SCard";
import LeaveTeamModel from "./LeaveTeamModel";

const LeaveTeam = ({ teamSlug }: any) => {
  const parsedTeam = JSON.parse(teamSlug);
  const [showModal, setShowModal] = useState<any>(false);

  return (
    <div className="flex-1 p-4">
      <Card className="border-[#DC8787]">
        <CardHeader>
          <CardTitle>Leave Team</CardTitle>
          <CardDescription className="text-gray-600">
            {`Revoke your access to this Team. Any resources you've added to
        this team will remain`}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#DC8787] text-white px-8 py-2"
          >
            Leave team
          </button>
        </CardFooter>
      </Card>
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
