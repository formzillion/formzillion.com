export const invitationEmail = ({
  inviterEmail,
  inviterName,
  toEmail,
  teamId,
  token,
}: any) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/register-invite?token=${token}&to=${toEmail}&team_id=${teamId}`;

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Team Invitation</title>
</head>
<body>
    <h2>Join your Team on Formzillion</h2>
    <p>${inviterName} has invited you to their FormZillion team.</p>
    <a href=${url}>Join now</a>
    <h3>What is Formzillion?</h3>
    <p>Instant backend for all your forms.</p>
    <p>Retain full control over the look and feel of your forms. Let us handle the rest, including scaling, security, integrations, collaboration and automations.</p>
</body>
</html>`;
};