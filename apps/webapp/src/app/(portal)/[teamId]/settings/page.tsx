import React from "react";
import UserName from "./UserName";
import UserUrl from "./UserUrl";
import DeleteAccount from "./DeleteAccount";
import { getUserDetail } from "@/utils/getUserDetail";
import { isEmpty } from "lodash";
import Avatar from "./Avatar";

const settingSections = [UserName, UserUrl, Avatar];

const TeamsPage = async ({ params }: any) => {
  const { teamId: teamSlug } = params;
  const user: any = await getUserDetail();
  const teams = user?.teams?.filter((team: any) => team.slug === teamSlug);

  if (teamSlug === "dashboard") {
    return <>You should be in a team to Access this page</>;
  }
  const serializedTeams = JSON.stringify(teams);
  let userTeams = JSON.stringify(
    user?.teams?.filter((team: any) => team.type === "default")
  );

  if (isEmpty(JSON.parse(userTeams))) {
    userTeams = serializedTeams;
  }
  return (
    <div className="space-y-4">
      {settingSections.map((Section, idx: number) => (
        <div className="space-y-5 w-full">
          <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
            <Section key={idx} teamSlug={serializedTeams} />
          </div>
        </div>
      ))}
      <DeleteAccount teamSlug={userTeams} />
    </div>
  );
};

export default TeamsPage;
