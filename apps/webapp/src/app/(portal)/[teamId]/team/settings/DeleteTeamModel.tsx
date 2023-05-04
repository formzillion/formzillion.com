"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import Button from "@/ui/Buttons";
import updateTeam from "@/app/fetch/teams/updateTeam";
import { useRouter } from "next/navigation";

export default function DeleteTeamModel({ closeModal, teamSlug }: any) {
  const router = useRouter();
  const onClickDeleteTeam = () => {
    updateTeam({
      teamName: teamSlug.name,
      teamSlug: teamSlug.slug,
      type: "deleteTeam",
    });
    closeModal();
    router.push("/dashboard");
  };

  return (
    <Dialog open={closeModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Dalete Team</DialogTitle>
          <DialogDescription className="text-gray-600">
            Once you dalete your team, you will no longer be able to access it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-red-600  text-white rounded-none"
            onClick={onClickDeleteTeam}
            type="submit"
          >
            Delete team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
