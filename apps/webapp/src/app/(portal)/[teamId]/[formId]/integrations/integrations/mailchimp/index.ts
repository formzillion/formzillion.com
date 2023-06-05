const clientId = process.env.NEXT_PUBLIC_MAILCHIMP_CLIENT_ID || "";
const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/slack-callback`;

export default function getMailchimpAuthUrl(options: any) {
  const authUrl = new URL(`https://login.mailchimp.com/oauth2/authorize`);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  authUrl.searchParams.set("state", JSON.stringify(options));

  return authUrl;
}
