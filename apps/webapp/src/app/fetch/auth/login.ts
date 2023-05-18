/**
 * This route creates a new team for a user within a certain organization.
 * @param {string} teamName - team Name
 * @param {string} teamSlug - team Slug
 * @returns
 */
const login = async ({
  email,
  password,
}: {
  email?: string;
  password?: string;
}) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const { url, error } = await response.json();

  return { url, error } || {};
};

export default login;
