"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/Card/SCard";
import React from "react";
import addMember from "@/app/fetch/teams/addMember";
import { Input } from "@/ui/Input/SimpleInput";

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
  };

  return (
    <div className="flex-1 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="email"
              placeholder="Email"
              className="border px-3 py-2 w-[30%] dark:bg-black dark:border-gray-800"
              value={email}
              onChange={handleEmailChange}
            />
            <select
              className="appearance-none w-[15%] border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
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
        </CardContent>
        <CardFooter className="flex justify-end">
          <button
            className="bg-orange-600 text-white px-4 py-2 hover:bg-orange-500"
            onClick={handleAddMember}
          >
            Add Member
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddMember;
