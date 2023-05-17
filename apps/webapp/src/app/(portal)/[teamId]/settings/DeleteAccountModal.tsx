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

let isPersonalAccount = false;

const checkAccount = (teamSlug: any) => {
  teamSlug = get(teamSlug, "0", "");
  if (teamSlug.type === "personal") {
    isPersonalAccount = true;
  }
  return isPersonalAccount;
};

export default function DeleteAccountModal({ closeModal, teamSlug }: any) {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState("");
  const [loading, setLoading] = useState<any>(false);

  const onClickDeleteTeam = async () => {
    const team = get(teamSlug, "0", "");
    if (isConfirmed === team.name) {
      setLoading(true);
      const response: any = await updateTeam({
        teamName: team.name,
        teamSlug: team.slug,
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

  isPersonalAccount = checkAccount(teamSlug);

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
                You are currently part of <b>{teamSlug.length}</b> teams. Please
                leave or delete these teams before you can delete your personal
                account.
              </DialogDescription>
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
