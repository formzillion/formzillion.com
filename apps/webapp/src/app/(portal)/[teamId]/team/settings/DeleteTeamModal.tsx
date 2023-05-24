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
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { get } from "lodash";
import { setItem } from "@/utils/sessionStorage";

export default function DeleteTeamModal({
  closeModal,
  teamSlug,
  personalAccount,
}: any) {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState("");
  const userAcc: any = JSON.parse(personalAccount);
  const storageData = get(userAcc, "0", {});
  const userSlug = get(userAcc, "0.slug", "");
  const [loading, setLoading] = useState(false);
  const onClickDeleteTeam = async () => {
    if (isConfirmed === teamSlug.name) {
      setLoading(true);
      const res = await updateTeam({
        teamName: teamSlug.name,
        teamSlug: teamSlug.slug,
        type: "deleteTeam",
      });
      if (res) {
        setLoading(false);
        closeModal();
        showSuccessToast("Deleted Team Successfully");
        setItem({
          name: "teamData",
          value: {
            label: storageData.name || "",
            value: storageData.slug || "",
            type: storageData.type || "",
            planName: storageData.planName || "",
            avatar: storageData.avatar || "",
          },
        });
        router.push(`/${userSlug}`);
        router.refresh();
      }
      setLoading(false);
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
            loading={loading}
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
