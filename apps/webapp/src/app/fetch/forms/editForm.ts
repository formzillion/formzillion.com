/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} teamName - team Name
 * @param {string} teamSlug - team Slug
 * @returns
 */
const createTeam = ({
  teamName,
  teamSlug,
}: {
  teamName: string;
  teamSlug: string;
}) =>
  fetch("/api/team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamName,
      teamSlug,
    }),
  }).then(async (res) => {
    if (res?.status === 200) {
      return (await res.json()).team;
    }
    console.log("Failed to create a team");
    return undefined;
  });

export default createTeam;
