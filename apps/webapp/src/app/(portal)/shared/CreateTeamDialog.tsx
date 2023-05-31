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
import { getSingleTeam } from "@/app/fetch/teams/getSingleTeam";
import { get, kebabCase } from "lodash";

const CreateTeamDialog = ({ setShowNewTeamDialog }: any) => {
  const router = useRouter();
  const [teamValues, setTeamValues] = useState<any>({
    name: "",
    emailsToInvite: "",
    plan: "free",
  });
  const [loading, setLoading] = useState(false);
  const [isTeamExist, setIsTeamExist] = useState(false);

  const onClickCreateTeam = async () => {
    const teamSlug = get(teamValues, "name", "");

    if (teamSlug.length >= 5) {
      setLoading(true);
      const team = await getSingleTeam({ teamSlug: kebabCase(teamSlug) });
      if (team.success) {
        setLoading(false);
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
          const teamSlug = get(responseData, "data.slug", "");
          const teamName = get(responseData, "data.name", "");
          sessionStorage.setItem(
            "teamData",
            JSON.stringify({
              label: teamName,
              avatar: "",
              planName: "",
              type: "default",
              value: teamSlug,
            })
          );
          router.push(`/${teamSlug}`);
          router.refresh();
        } else {
          setLoading(false);
          showErrorToast(responseData.message);
        }
      }
    } else {
      showErrorToast("Team name must be atleast 5 characters");
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

  const plans = [
    {
      label: "Free",
      value: "free",
      price: "0",
      details: "Trial for two weeks",
    },
    {
      label: "Basic",
      value: "basic",
      price: "5",
      details: "$5/month per user",
    },
    {
      label: "Standrad",
      value: "standrad",
      price: "10",
      details: "$10/month per user",
    },
    {
      label: "Premium",
      value: "premium",
      price: "28",
      details: "$28/month per user",
    },
    {
      label: "Agency",
      value: "agency",
      price: "100",
      details: "$100/month per user",
    },
  ];
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
            <Select
              defaultValue={"free"}
              onValueChange={(plan) =>
                setTeamValues({
                  ...teamValues,
                  plan,
                })
              }
            >
              <SelectTrigger className="rounded-none">
                <SelectValue
                  className="text-gray-600"
                  placeholder="Select a plan"
                />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <div key={plan.price}>
                    <SelectItem className={"dark:bg-black"} value={plan.value}>
                      <span className="font-medium">{plan.label}</span> -{" "}
                      <span className="text-muted-foreground">
                        {plan.details}
                      </span>
                    </SelectItem>
                  </div>
                ))}
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
