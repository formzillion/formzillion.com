import slackAuthUrl from "./slack/getAuthUrl";
import mailchimpAuthUrl from "./mailchimp/getAuthUrl";

const getAuthUrl = async (provider: string, options: any) => {
  let authUrl: any = "";
  if (provider === "slack") {
    authUrl = slackAuthUrl(options);
  } else if (provider === "mailchimp") {
    authUrl = mailchimpAuthUrl(options);
  } else if (provider === "airtable") {
    const getAuthUrl = await fetch(`/api/integrations/airtable/auth`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamSlug: options?.teamSlug,
        email: options?.email,
        formId: options?.formId,
      }),
    });
    const response = await getAuthUrl.json();
    authUrl = response.authUrl;
  }

  return authUrl;
};
const auth = async (provider: string, options: any, router: any) => {
  const url = await getAuthUrl(provider, options);
  const x = window.screen.width / 2 - 600 / 2;
  const y = window.screen.height / 2 - 600 / 2;

  const authWindow: any = window.open(
    url,
    "Authentication",
    `height=600,width=600,left=${x},top=${y}`
  );

  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${options.teamSlug}/${options.formId}/integrations/${provider}?status=connected`;
  // Checking for the auth window to close
  const checkForAuthWindow = setInterval(() => {
    if (authWindow.closed) {
      if (provider === "airtable") {
        return router.replace(redirectUrl);
      }
      router.refresh();
      clearInterval(checkForAuthWindow);
    }
  }, 3000);
};

export default { auth };
