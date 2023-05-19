import { map, startCase } from "lodash";

export const newSubmissionTemplete = ({
  formValues = {},
  formName = "",
  date = "",
  formOwner = "",
  dashboardUrl = "",
}) => {
  const fields = map(formValues, (value, key) => ({
    type: "mrkdwn",
    text: `*${startCase(key)}*:\n${value}`,
  }));
  return {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: ":receipt: New Form Submission",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `*${date}*  |  ${formName}`,
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        fields: fields,
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Go to the dashboard",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Dashboard",
            emoji: true,
          },
          style: "primary",
          value: dashboardUrl,
          url: dashboardUrl,
          action_id: "button-action",
        },
      },
      {
        type: "divider",
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `:hand: Hi *${formOwner}* have any queries or need help? Please reach us out at hello@formzillion.com.`,
          },
        ],
      },
    ],
  };
};

export default newSubmissionTemplete;
