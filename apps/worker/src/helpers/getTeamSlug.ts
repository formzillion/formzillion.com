import { isEmpty } from "lodash";

import { prisma } from "../../utils";

const teamIdToTeamSlugMap = {} as { [key: string]: string };

export const getTeamSlug = async ({ teamId }: any) => {
  if (isEmpty(teamIdToTeamSlugMap)) {
    const teams = await prisma.teams.findMany({
      select: { id: true, slug: true },
    });
    teams.forEach(
      (t: { id: string; slug: string }) => (teamIdToTeamSlugMap[t.id] = t.slug)
    );
  } else {
    const singleTeam = await prisma.teams.findFirst({
      where: { id: teamId },
      select: { slug: true },
    });
    teamIdToTeamSlugMap[teamId] = singleTeam.slug;
  }

  return teamIdToTeamSlugMap;
};

export default getTeamSlug;
