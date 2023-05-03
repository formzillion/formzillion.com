"use client";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/Card/SCard";
import DeleteTeamModel from "./DeleteTeamModel";

const DeleteTeam = ({ teamSlug }: any) => {
  const parsedTeam = JSON.parse(teamSlug);
  const [showModal, setShowModal] = useState<any>(false);
  return (
    <div className="flex-1 p-4">
      <Card className="border-[#FC1010]">
        <CardHeader>
          <CardTitle>Delete Team</CardTitle>
          <CardDescription className="text-gray-600">
            Permanently purge this team and all of the associated resources from
            Formzillion. This action is irreversible, so we advice caution
            before proceeding with this operation.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="flex bg-[#FC1010] text-white px-8 py-2"
            >
              Delete team
            </button>
          </div>
        </CardFooter>
      </Card>
      {showModal && (
        <DeleteTeamModel
          closeModal={() => {
            setShowModal(false);
          }}
          teamSlug={parsedTeam}
        />
      )}
    </div>
  );
};

export default DeleteTeam;
