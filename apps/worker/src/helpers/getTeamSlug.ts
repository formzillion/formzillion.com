import { isEmpty } from "lodash";

const teamIdToTeamSlugMap = {} as { [key: string]: string };

export const getTeamSlug = async ({ teamId }: { teamId: string }) => {
  const pg = global?.pg;

  if (isEmpty(teamIdToTeamSlugMap)) {
    const teams = await pg.from("teams").select("*");
    teams.forEach((t: any) => (teamIdToTeamSlugMap[t.id] = t.slug));
  } else {
    const singleTeam = await pg.from("teams").where({ id: teamId }).first();
    teamIdToTeamSlugMap[teamId] = singleTeam.slug;
  }

  return teamIdToTeamSlugMap;
};

export default getTeamSlug;
