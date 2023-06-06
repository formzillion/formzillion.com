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
import { get, snakeCase } from "lodash";
import { setItem } from "@/utils/sessionStorage";
import { getTeamDetails } from "@/utils/getTeamDetails";
import Link from "next/link";

export default function DeleteTeamModal({
  closeModal,
  teamSlug,
  personalAccount,
}: any) {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState("");
  const userAcc: any = JSON.parse(personalAccount);
  const storageData = get(userAcc, "0", {});

  const {
    teamName,
    teamSlug: slug,
    teamType,
    teamAvatar,
    plan,
  } = getTeamDetails(storageData);

  const {
    teamName: accName,
    teamSlug: accSlug,
    plan: accPlan,
    disabled,
  } = getTeamDetails(teamSlug);

  const userSlug = get(userAcc, "0.slug", "");
  const [loading, setLoading] = useState(false);

  const onClickDeleteTeam = async () => {
    if (isConfirmed === teamSlug.name) {
      setLoading(true);
      const res = await updateTeam({
        teamName: accName,
        teamSlug: accSlug,
        type: "deleteTeam",
      });
      if (res) {
        setLoading(false);
        closeModal();
        showSuccessToast("Deleted Team Successfully");
        setItem({
          name: "teamData",
          value: {
            label: teamName || "",
            value: slug || "",
            type: teamType || "",
            planName: snakeCase(plan) || "",
            avatar: teamAvatar || "",
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
            Once you delete your team, you will no longer be able to access it.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            {accPlan === "free" ? (
              <div
                className="bg-red-100 dark:bg-red-600 dark:text-red-50 shadow border border-red-600 text-red-700 px-4 py-2 rounded relative"
                role="alert"
              >
                <strong className="font-bold text-sm">Warning! </strong>
                <span className="block sm:inline text-sm">
                  Please be aware that this action is irreversible. Please
                  ensure that you are certain before proceeding.
                </span>
              </div>
            ) : (
              <div
                className="bg-red-100 dark:bg-red-600 dark:text-red-50 shadow border border-red-600 text-red-700 px-4 py-2 rounded relative"
                role="alert"
              >
                <strong className="font-bold text-sm">Note: </strong>
                <span className="block sm:inline text-sm">
                  You are currently under paid plan for this team. Please cancel
                  the plan before you proceed to delete the team.{" "}
                  <Link href={"settings/billing"} target="_black">
                    go to billing
                  </Link>
                </span>
              </div>
            )}
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
            disabled={disabled ? false : true}
          >
            Delete team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
