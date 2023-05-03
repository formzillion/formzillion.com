import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";

/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} teamName - team Name
 * @param {string} teamSlug - team Slug
 * @returns
 */
const updateTeam = ({
  teamName,
  teamSlug,
  type,
}: {
  teamName?: string;
  teamSlug?: string;
  type?: string;
}) => {
  fetch("/api/teams/updateTeam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamName,
      teamSlug,
      type,
    }),
  }).then(async (res) => {
    if (res?.status === 201) {
      showSuccessToast("Team updated successfully");
      return (await res.json()).team;
    } else {
      showErrorToast("Failed to update team");
      return undefined;
    }
  });
};

export default updateTeam;
