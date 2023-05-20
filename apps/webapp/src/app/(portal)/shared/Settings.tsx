"use client";
import { DropdownMenuItem } from "@/ui/DropdownMenu";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Settings = () => {
  let teamData;
  if (typeof window !== "undefined") {
    const team: any = sessionStorage.getItem("teamData");
    teamData = JSON.parse(team);
  }
  const type = teamData?.type;
  return (
    <Link
      href={
        type === "personal"
          ? `/${teamData.value}/settings`
          : `/${teamData.value}/team/settings`
      }
    >
      <DropdownMenuItem className="cursor-pointer">
        <Cog6ToothIcon className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-500" />
        Settings
      </DropdownMenuItem>
    </Link>
  );
};

export default Settings;