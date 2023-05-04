"use client";
import React from "react";
import addMember from "@/app/fetch/teams/addMember";
import { Input } from "@/ui/Input/SimpleInput";
import Header from "@/ui/Header";
import Heading from "../Heading";
import CardFooter from "@/ui/CardFooter";

const AddMember = ({ teamSlug }: any) => {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("MEMBER");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleAddMember = () => {
    addMember({ emailsToInvite: email, teamSlug, role });
    setEmail("");
    setRole("MEMBER");
  };

  return (
    <div className="space-y-5">
      <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
        <div className="p-4 px-6 divide-y divide-gray-300">
          <Header title={"Add Members"} />
          <div className="py-4">
            <Heading description="Invite your team members to join the team" />
            <div className="flex items-center space-x-2">
              <Input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 w-[80%] dark:bg-black dark:border-gray-800"
                value={email}
                onChange={handleEmailChange}
              />
              <select
                className="appearance-none w-[20%] border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
                name="spamFilter"
                id="spamFilter"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
                <option value="OWNER">Owner</option>
              </select>
            </div>
          </div>
        </div>
        <CardFooter btnText={"Add Member"} onClick={handleAddMember} />
      </div>
    </div>
  );
};

export default AddMember;
