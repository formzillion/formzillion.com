export const notifyOnSlack = async (
  userName: string,
  emojiIcon: any,
  textToSend: any,
  shouldNotifyChannel = false
) => {
  if (process.env.NODE_ENV !== "production") {
    const slackMessage = shouldNotifyChannel
      ? `<!channel> ${textToSend}`
      : textToSend;

    const postBody = {
      username: userName,
      icon_emoji: emojiIcon,
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
