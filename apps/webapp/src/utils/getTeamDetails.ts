import { get } from "lodash";

export const getTeamDetails = (teams: any) => {
  teams = teams.find((team: any) => team.team.type === "default");

  let teamSlug = get(teams, "team.slug", "");
  let teamId = get(teams, "team.id", "");
  let teamName = get(teams, "team.name", "");
  let teamAvatar = get(teams, "team.avatar", "");
  let plan = get(teams, "team.planName", "");

  const url = `/${teamSlug}/team/settings/billing`;
  const disabled = plan === "free" ? true : false;

  return { teamSlug, teamId, teamName, teamAvatar, plan, url, disabled };
};

export const getExportModelData = (userData: any, pathName: any) => {
  const formattedPathName = pathName.split("/");
  let teamSlug = get(formattedPathName, "1", "");
  const teams = get(userData, "teams", []);

  userData = teams.find((team: any) => team.slug === teamSlug);

  let teamId = get(userData, "id", "");
  let teamName = get(userData, "name", "");
  let teamAvatar = get(userData, "avatar", "");
  let plan = get(userData, "planName", "");
  let teamType = get(userData, "type", "");

  const url =
    teamType === "default"
      ? `/${teamSlug}/team/settings/billing`
      : `/${teamSlug}/settings/billing`;

  const disabled = plan === "free" ? true : false;
  return {
    teamSlug,
    teamId,
    teamName,
    teamAvatar,
    plan,
    url,
    disabled,
    teamType,
  };
};
