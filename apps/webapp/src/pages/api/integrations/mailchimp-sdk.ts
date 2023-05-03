export const getAccessToken = async (code: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_MAILCHIMP_CLIENT_ID || "",
    client_secret: process.env.NEXT_PUBLIC_MAILCHIMP_CLIENT_SECRET_ID || "",
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/mailchimp-callback`,
    code,
  });

  try {
    const response = await fetch("https://login.mailchimp.com/oauth2/token", {
      method: "POST",
      body: urlencoded,
    });
    const result = await response.json();

    const getUserDetails = await fetch(
      "https://login.mailchimp.com/oauth2/metadata",
      { headers: { Authorization: `OAuth ${result?.access_token}` } }
    );

    const userDetails = await getUserDetails.json();

    return (
      {
        access_token: result?.access_token,
        ...userDetails,
      } || {}
    );
  } catch (error) {
    console.log("error", error);
    return {};
  }
};
