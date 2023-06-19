export const publishMessage = async (token: any, options: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json; charset=utf-8");

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        channel: options.channel,
        text: options.text,
      }),
      redirect: "follow",
    };
    const response = await fetch(
      "https://slack.com/api/chat.postMessage",
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getAccessToken = async (code: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", process.env.SLACK_CLIENT_ID || "");
  urlencoded.append("client_secret", process.env.SLACK_CLIENT_SECRET_ID || "");
  urlencoded.append("code", code);

  try {
    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const response = await fetch(
      "https://slack.com/api/oauth.access",
      requestOptions
    );
    const result = await response.json();
    return result || {};
  } catch (error) {
    console.log("Error from Slack sdk", error);
    return {};
  }
};
