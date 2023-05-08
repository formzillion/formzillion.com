import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";

/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} teamName - team Name
 * @param {string} teamSlug - team Slug
 * @returns
 */
const updateTeam = async ({
  teamName,
  teamSlug,
  type,
}: {
  teamName?: string;
  teamSlug?: string;
  type?: string;
}) => {
  const response = await fetch("/api/teams/updateTeam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teamName, teamSlug, type }),
  });

  const res = await response.json();

  return res || {};
};

export default updateTeam;
