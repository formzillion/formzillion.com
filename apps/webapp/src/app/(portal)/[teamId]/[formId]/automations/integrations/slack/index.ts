const clientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID || "";
const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/slack-callback`;
const scope = "incoming-webhook,users.profile:read,chat:write:bot";

export default function getSlackAuthUrl(options: any) {
  const authUrl = new URL(`https://slack.com/oauth/authorize`);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", scope);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("single_channel", "0");
  authUrl.searchParams.set("state", JSON.stringify(options));

  return authUrl;
}
