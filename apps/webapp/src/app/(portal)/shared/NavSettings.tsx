"use client";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NavSettings = () => {
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
      <Cog6ToothIcon className="h-4 w-4" />
    </Link>
  );
};

export default NavSettings;
