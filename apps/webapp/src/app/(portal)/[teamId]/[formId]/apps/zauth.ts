const serialize = function (obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const composeSlackAuthUrl = (options: any) => {
  const baseUrl = "https://slack.com/oauth/authorize";
  const qp = {
    client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID || "",
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/slack-callback`,
    state: JSON.stringify({ email: options?.email, teamSlug: options?.teamId }),
    scope: "incoming-webhook,users.profile:read,chat:write:bot",
    response_type: "code",
    single_channel: 0,
  };
  return baseUrl + "?" + serialize(qp);
};

const composeGoogleAuthUrl = (options: any) => {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const qp = {
    access_type: "offline",
    prompt: "consent",
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    token: "",
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/google-callback`,
    state: options.email,
    service: "lso",
    o2v: 2,
    scope:
      "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  };
  return baseUrl + "?" + serialize(qp);
};

const composeMailchimpAuthUrl = (options: any) => {
  const baseUrl = "https://login.mailchimp.com/oauth2/authorize";
  const qp = {
    access_type: "offline",
    prompt: "consent",
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_MAILCHIMP_CLIENT_ID || "",
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/mailchimp-callback`,
    state: JSON.stringify({ email: options?.email, teamSlug: options?.teamId }),
  };
  return baseUrl + "?" + serialize(qp);
};

const getAuthUrl = (provider: string, options: any) => {
  let authUrl = "";
  if (provider === "slack") {
    authUrl = composeSlackAuthUrl(options);
  } else if (provider === "google_sheets") {
    authUrl = composeGoogleAuthUrl(options);
  } else if (provider === "mailchimp") {
    authUrl = composeMailchimpAuthUrl(options);
  }
  return authUrl;
};

const auth = (provider: string, options: any) => {
  const url = getAuthUrl(provider, options);
  const x = window.screen.width / 2 - 600 / 2;
  const y = window.screen.height / 2 - 600 / 2;

  window.open(url, "Authentication", `height=600,width=600,left=${x},top=${y}`);
};

const methods = { auth };

export default methods;
