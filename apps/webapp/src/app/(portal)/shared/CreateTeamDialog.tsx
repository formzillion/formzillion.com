"use client";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import { Input } from "@/ui/Input/SimpleInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import React, { useState } from "react";
import Button2 from "@/ui/Buttons";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { useRouter } from "next/navigation";
import getSingleTeam from "@/app/fetch/teams/getSingleTeam";
import { get } from "lodash";

const CreateTeamDialog = ({ setShowNewTeamDialog }: any) => {
  const router = useRouter();
  const [teamValues, setTeamValues] = useState<any>({
    name: "",
    emailsToInvite: [""],
  });
  const [loading, setLoading] = useState(false);
  const [isTeamExist, setIsTeamExist] = useState(false);

  const onClickCreateTeam = async () => {
    const teamSlug = get(teamValues, "name", "");

    if (teamSlug.length > 5) {
      const team = await getSingleTeam({ teamSlug: teamSlug });
      if (team.success) {
        setIsTeamExist(true);
      } else {
        setIsTeamExist(false);
        setLoading(true);
        const response: any = await fetch("/api/teams/create", {
          method: "POST",
          body: JSON.stringify(teamValues),
        });
        setShowNewTeamDialog(false);
        const responseData = await response.json();

        if (response.status === 201) {
          showSuccessToast("Created Team Successfully");
          setLoading(false);
          const teamSlug = responseData.data.slug;
          router.push(`/${teamSlug}`);
        } else {
          setLoading(false);
          showErrorToast(responseData.message);
        }
      }
    }
  };
  const onChangeField = async (e: any) => {
    const { name, value } = e.target;
    setIsTeamExist(false);
    setTeamValues({
      ...teamValues,
      [name]: value,
    });
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create team</DialogTitle>
        <DialogDescription className="text-gray-600">
          Add a new team to manage products and customers.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <label htmlFor="teamName">Team name</label>
            {isTeamExist && (
              <p className="text-xs text-red-600 animate-bounce ease-in-out">
                Team with this name already exists.
              </p>
            )}
            <Input
              className="text-gray-600"
              type="text"
              name="name"
              id="name"
              autoComplete="teamName"
              value={teamValues?.name}
              placeholder="Team name"
              onChange={onChangeField}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="emails">Emails</label>
            <Input
              type="email"
              name="emailsToInvite"
              id="emails"
              autoComplete="emails"
              value={teamValues?.emailsToInvite}
              placeholder="Enter emails in comma separated format."
              onChange={onChangeField}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="plan">Subscription plan</label>
            <Select>
              <SelectTrigger className="rounded-none">
                <SelectValue
                  className="text-gray-600"
                  placeholder="Select a plan"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className={"dark:bg-black"} value="free">
                  <span className="font-medium">Free</span> -{" "}
                  <span className="text-muted-foreground">
                    Trial for two weeks
                  </span>
                </SelectItem>
                <SelectItem className={"dark:bg-black"} value="pro">
                  <span className="font-medium">Pro</span> -{" "}
                  <span className="text-muted-foreground">
                    $9/month per user
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button2
          loading={loading}
          className="bg-orange-600 text-white rounded-none"
          disabled={isTeamExist}
          onClick={onClickCreateTeam}
          type="submit"
        >
          Create
        </Button2>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateTeamDialog;
