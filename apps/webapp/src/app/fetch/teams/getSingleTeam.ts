/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} teamName - team Name
 * @param {string} teamSlug - team Slug
 * @returns
 */
const getSingleTeam = async ({ teamSlug }: { teamSlug?: string }) => {
  const response = await fetch("/api/teams/getTeam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teamSlug }),
  });

  const res = await response.json();

  return res || {};
};

export default getSingleTeam;
