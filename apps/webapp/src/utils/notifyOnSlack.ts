export const notifyOnSlack = async (userName: string, textToSend: any) => {
  if (process.env.NODE_ENV === "development") {
    const slackMessage = `<!channel> ${textToSend}`;

    const postBody = {
      username: userName,
      text: slackMessage,
    };

    try {
      fetch(
        "https://hooks.slack.com/services/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",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );
    } catch (err) {
      console.error(err);
    }
  } else {
    return;
  }
};
