export default async function customHoneypots(
  reqBody: any,
  customHoneypot: any
) {
  if (!reqBody[customHoneypot]) {
    console.log("Form submission success!");
    return false;
  }
  console.log("Form submission failed");
  return true;
}
