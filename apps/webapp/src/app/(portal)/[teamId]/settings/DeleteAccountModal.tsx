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
import { get } from "lodash";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { Input } from "@/ui/Input/SimpleInput";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { getTeamDetails } from "@/utils/getTeamDetails";
import Link from "next/link";

export default function DeleteAccountModal({ closeModal, teamSlug }: any) {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState("");
  const [loading, setLoading] = useState<any>(false);
  const team = get(teamSlug, "0", "");
  const {
    teamName,
    teamSlug: slug,
    isPersonalAccount,
    plan,
    disabled,
  } = getTeamDetails(team);

  const onClickDeleteTeam = async () => {
    if (isConfirmed === team.name) {
      setLoading(true);
      const response: any = await updateTeam({
        teamName: teamName,
        teamSlug: slug,
        type: "deleteAccount",
      });

      if (response.success) {
        showSuccessToast("Account deleted successfully");
        setLoading(false);
        closeModal();
        router.push("/register");
      }
    } else {
      showErrorToast("Please type-in the correct team name");
    }
  };

  const onChangeField = (e: any) => {
    const { value } = e.target;
    setIsConfirmed(value);
  };

  return (
    <>
      {isPersonalAccount ? (
        <Dialog open={closeModal} onOpenChange={closeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Personal Account</DialogTitle>
              <DialogDescription className="text-gray-600">
                Once you delete your Account, you will no longer be able to
                access it.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="space-y-4 py-2 pb-4">
                {plan === "free" ? (
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
                      You are currently under paid plan for this account. Please
                      cancel the plan before you proceed to delete the account.
                      <Link href={"settings/billing"} target="_black">
                        go to billing
                      </Link>
                    </span>
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {`Please type-in `}
                    <b>{`"${teamSlug[0].name}"`}</b>
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
                disabled={disabled ? false : true}
              >
                Delete account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={closeModal} onOpenChange={closeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Personal Account</DialogTitle>
              <DialogDescription className="text-gray-500">
                Once you delete your Account, you will no longer be able to
                access it.
              </DialogDescription>
              <div
                className="bg-red-100 dark:bg-orange-600 dark:text-red-50 shadow border border-orange-600 text-orange-700 px-4 py-2 rounded relative"
                role="alert"
              >
                <strong className="font-bold text-sm">Warning! </strong>
                <span className="block sm:inline text-sm">
                  You are currently part of <b>{teamSlug.length}</b> teams.
                  Please leave or delete these teams before you can delete your
                  personal account.
                </span>
              </div>
            </DialogHeader>
            <div className=" divide-y border rounded-md border-gray-200 divide-gray-200 dark:border-gray-600 dark:divide-gray-600 ">
              {teamSlug.map((team: any) => (
                <div className="flex p-4 items-center">
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${team.slug}.png`}
                      alt={team.label}
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {team.name}
                  <a
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/${team.slug}/team/settings`}
                    target="_blank"
                    className="ml-auto text-sm  text-indigo-600 dark:indigo-600"
                    rel="noreferrer"
                  >
                    Settings
                  </a>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                className="bg-red-600  text-white rounded-none"
                onClick={closeModal}
                type="submit"
                loading={loading}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
