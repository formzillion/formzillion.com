import React from "react";
import TeamName from "./TeamName";
import TeamUrl from "./TeamUrl";
import LeaveTeam from "./LeaveTeam";
import DeleteTeam from "./DeleteTeam";
import Avatar from "./Avatar";
import { getUserDetail } from "@/utils/getUserDetail";
import { get } from "lodash";

const settingSections = [TeamName, TeamUrl, Avatar];

const TeamsPage = async ({ params }: any) => {
  const { teamId: teamSlug } = params;
  const user: any = await getUserDetail();
  const teams = user?.teams?.filter((team: any) => team.slug === teamSlug);
  const personalAccount = user?.teams?.filter(
    (team: any) => team.type === "personal"
  );

  if (teamSlug === "dashboard") {
    return <>You should be in a team to Access this page</>;
  }

  const serializedTeams = JSON.stringify(get(teams, "0", {}));
  const serializedAccount = JSON.stringify(personalAccount);
  return (
    <div className="space-y-4">
      {settingSections.map((Section, idx: number) => (
        <div className="space-y-5 w-full">
          <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
            <Section key={idx} teamSlug={serializedTeams} />
          </div>
        </div>
      ))}
      <LeaveTeam
        teamSlug={serializedTeams}
        personalAccount={serializedAccount}
      />
      <DeleteTeam
        teamSlug={serializedTeams}
        personalAccount={serializedAccount}
      />
    </div>
  );
};

export default TeamsPage;
