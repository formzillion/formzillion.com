import Sidebar from "@/ui/Sidebar";
import React from "react";
import TeamName from "./TeamName";
import TeamUrl from "./TeamUrl";
import LeaveTeam from "./LeaveTeam";
import DeleteTeam from "./DeleteTeam";
import prisma from "@/lib/prisma";

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
    <div className=" mt-6">
      <TeamName teamSlug={serializedTeams} />
      <TeamUrl teamSlug={serializedTeams} />
      <LeaveTeam teamSlug={serializedTeams} />
      <DeleteTeam teamSlug={serializedTeams} />
    </div>
  );
};

export default TeamsPage;
