import Sidebar from "@/ui/Sidebar";
import React from "react";
import TeamName from "./TeamName";
import TeamUrl from "./TeamUrl";
import LeaveTeam from "./LeaveTeam";
import DeleteTeam from "./DeleteTeam";
import prisma from "@/lib/prisma";

const settingSections = [TeamName, TeamUrl, LeaveTeam];

const TeamsPage = async ({ params }: any) => {
  const { teamId: teamSlug } = params;
  if (teamSlug === "dashboard") {
    return <>You should be in a team to Access this page</>;
  }
  const teams = await prisma.teams.findUniqueOrThrow({
    where: { slug: teamSlug },
  });

  const serializedTeams = JSON.stringify(teams);
  return (
    <div className="space-y-4">
      {settingSections.map((Section, idx: number) => (
        <div className="space-y-5 w-full">
          <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
            <Section key={idx} teamSlug={serializedTeams} />
          </div>
        </div>
      ))}
      <DeleteTeam teamSlug={serializedTeams} />
    </div>
  );
};

export default TeamsPage;
