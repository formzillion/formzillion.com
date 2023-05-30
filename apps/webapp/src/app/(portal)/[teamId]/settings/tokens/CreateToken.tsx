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

  const dateOptions: any = [
    {
      name: "Expiration",
      value: "1",
    },
    {
      name: "1 Day",
      value: "1",
    },
    {
      name: "7 Days",
      value: "7",
    },
    {
      name: "30 Days",
      value: "30",
    },
    {
      name: "60 Days",
      value: "60",
    },
    {
      name: "90 Days",
      value: "90",
    },
    {
      name: "180 Days",
      value: "180",
    },
    {
      name: "1 Year",
      value: "365",
    },
    {
      name: "No Expiration",
      value: "0",
    },
  ];

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
            <div className="sm:flex items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                type="text"
                placeholder="New Token"
                className="border px-3 py-2 sm:w-[35%] dark:bg-black dark:border-gray-800"
                value={name}
                onChange={handleNameChange}
              />
              <select
                className="appearance-none sm:w-[35%] block border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
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
                className="appearance-none sm:w-[30%] block border h-[44px] dark:bg-black dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-500 sm:text-sm dark:text-gray-200"
                name="expiration"
                id="expiration"
                value={expiry}
                onChange={handleExpiration}
              >
                {dateOptions?.map((option: any) => {
                  return <option value={option.value}>{option.name}</option>;
                })}
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
