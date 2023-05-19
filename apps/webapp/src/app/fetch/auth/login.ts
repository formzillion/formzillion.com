/**
 * This route Logins the user into the application
 * @param {string} email
 * @param {string} password
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
  const { url, avatar, planName, error } = await response.json();

  return { url, avatar, planName, error } || {};
};

export default login;
