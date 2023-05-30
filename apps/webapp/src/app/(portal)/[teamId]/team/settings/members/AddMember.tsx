"use client";
import React, { useState } from "react";
import addMember from "@/app/fetch/teams/addMember";
import { Input } from "@/ui/Input/SimpleInput";
import Header from "@/ui/Header";
import Heading from "../Heading";
import CardFooter from "@/ui/CardFooter";
import { useRouter } from "next/navigation";
import {
  showErrorToast,
  showSuccessToast,
  toastMessages,
} from "@/ui/Toast/Toast";
import { teamDetails } from "@/utils/getTeamDetails";
import UpgradePlan from "@/components/UpgradePlan";

const AddMember = ({ teamSlug, teams }: any) => {
  const parsedTeams = JSON.parse(teams);
  const { plan, url, disabled } = teamDetails(parsedTeams);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleAddMember = async () => {
    if (email.length > 5) {
      setLoading(true);
      const res = await addMember({
        emailsToInvite: email,
        teamSlug,
        role,
        plan,
      });
      if (!res.success) {
        showErrorToast(res.message);
      }
      if (res.success) {
        setLoading(false);
        setEmail("");
        setRole("MEMBER");
        showSuccessToast(
          "Member added successfully if not formzillion user email invitations are sent."
        );
        router.refresh();
      } else {
        setLoading(false);
        showErrorToast(res.message || toastMessages.error);
      }
    } else {
      setLoading(false);
      showErrorToast("Please enter a valid email address.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
        <div className="p-4 px-6 divide-y divide-gray-300">
          <Header title={"Add Members"} />
          <div className="py-4">
            <div className="flex">
              <Heading description="Invite members to join the team." />
              {plan === "free" && <UpgradePlan url={url} />}
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 w-[80%] dark:bg-black dark:border-gray-800"
                value={email}
                onChange={handleEmailChange}
                disabled={disabled}
              />
              <select
                className="appearance-none w-[20%] border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
                name="spamFilter"
                id="spamFilter"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="MEMBER">Member</option>
                <option value="OWNER">Owner</option>
              </select>
            </div>
          </div>
        </div>
        <CardFooter
          loading={loading}
          btnText={"Add Member"}
          onClick={handleAddMember}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default AddMember;
