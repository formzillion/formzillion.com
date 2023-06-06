export const notifyOnSlack = async (userName: string, textToSend: any) => {
  if (process.env.NODE_ENV === "development") {
    const slackMessage = `<!channel> ${textToSend}`;

    const postBody = {
      username: userName,
      text: slackMessage,
    };

    const url: any = process.env.SLACK_ACTIVITY_URL || "";

    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    return;
  }
};
