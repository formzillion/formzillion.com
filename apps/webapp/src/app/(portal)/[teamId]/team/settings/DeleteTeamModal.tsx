"use client";

import React, { useState } from "react";
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
import { Input } from "@/ui/Input/SimpleInput";
import { showErrorToast } from "@/ui/Toast/Toast";

export default function DeleteTeamModal({ closeModal, teamSlug }: any) {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState("");

  const onClickDeleteTeam = () => {
    if (isConfirmed === teamSlug.name) {
      updateTeam({
        teamName: teamSlug.name,
        teamSlug: teamSlug.slug,
        type: "deleteTeam",
      });
      closeModal();
      router.push("/register");
    } else {
      showErrorToast("Please type-in the correct team name");
    }
  };

  const onChangeField = (e: any) => {
    const { value } = e.target;
    setIsConfirmed(value);
  };

  return (
    <Dialog open={closeModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete Team</DialogTitle>
          <DialogDescription className="text-gray-600">
            Once you dalete your team, you will no longer be able to access it.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {`Please type-in `}
                <b>{`"${teamSlug.name}"`}</b>
                {` to confirm.`}
              </p>
              <Input
                type="text"
                id="confirm"
                onChange={onChangeField}
                required
              />
            </div>
          </div>
        </div>
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
