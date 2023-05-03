import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";

/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} teamName - team Name
 * @param {string} teamSlug - team Slug
 * @returns
 */
const addMember = ({
  emailsToInvite,
  teamSlug,
  role,
}: {
  emailsToInvite?: string;
  teamSlug?: string;
  role?: string;
}) =>
  fetch("/api/teams/addMember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailsToInvite,
      teamSlug,
      role,
    }),
  }).then(async (res) => {
    if (res?.status === 201) {
      showSuccessToast("Added Members");
      return (await res.json()).team;
    }
    const error = await res.json();
    console.log("Failed to add member");
    showErrorToast(error.message);
    return undefined;
  });

export default addMember;
