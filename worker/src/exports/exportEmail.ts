export const ExportSubmissionsEmail = ({ fileUrl }: any) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Exported Your Submissions</title>
</head>
<body>
    <h2>Your Submissions export file is Ready</h2>
    <a href=${fileUrl}>Download now</a>
    <h3>What is Formzillion?</h3>
    <p>Instant backend for all your forms.</p>
    <p>Retain full control over the look and feel of your forms. Let us handle the rest, including scaling, security, integrations, collaboration and automations.</p>
</body>
</html>`;
};
