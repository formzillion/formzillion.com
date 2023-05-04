"use client";
import React from "react";
import { Input } from "@/ui/Input/SimpleInput";
import Header from "@/ui/Header";
import Heading from "../Heading";
import CardFooter from "@/ui/CardFooter";

const CreateToken = () => {
  const [name, setName] = React.useState("");
  const [expiry, setExpiry] = React.useState("EXPIRATION");
  const [scope, setScope] = React.useState("TEAM");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleExpiration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExpiry(e.target.value);
  };

  const handleScope = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScope(e.target.value);
  };

  const handleAddMember = () => {
    setName("");
    setScope("TEAM");
  };

  return (
    <div className="space-y-5">
      <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
        <div className="p-4 px-6 divide-y divide-gray-300">
          <Header title={"Create Token"} />
          <div className="py-4">
            <Heading
              description="Enter a unique name for your token to differentiate it from other tokens.
Then select the scope for the token."
            />
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="New Token"
                className="border px-3 py-2 w-[35%] dark:bg-black dark:border-gray-800"
                value={name}
                onChange={handleNameChange}
              />
              <select
                className="appearance-none w-[35%] border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
                name="scope"
                id="scope"
                value={scope}
                onChange={handleScope}
              >
                <option value="TEAM">Scope</option>
                <option value="TEAM">Team 1</option>
                <option value="TEAM">Team 2</option>
                <option value="TEAM">Team 3</option>
              </select>
              <select
                className="appearance-none w-[30%] border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
                name="expiration"
                id="expiration"
                value={expiry}
                onChange={handleExpiration}
              >
                <option value="1">Expiration</option>
                <option value="1">1 Day</option>
                <option value="7">7 Days</option>
                <option value="30">30 Days</option>
                <option value="60">60 Days</option>
                <option value="90">90 Days</option>
                <option value="180">180 Days</option>
                <option value="360">1 Year</option>
                <option value="0">No Expiration</option>
              </select>
            </div>
          </div>
        </div>
        <CardFooter
          title={"Learn more about tokens"}
          btnText={"Add Member"}
          onClick={handleAddMember}
        />
      </div>
    </div>
  );
};

export default CreateToken;