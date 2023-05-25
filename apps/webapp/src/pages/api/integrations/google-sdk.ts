export const getAccessToken = async (code: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", process.env.GOOGLE_CLIENT_ID || "");
  urlencoded.append("client_secret", process.env.GOOGLE_CLIENT_SECRET_ID || "");
  urlencoded.append("code", code);
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append(
    "redirect_uri",
    `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/google-callback`
  );

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/token`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
  }
};
