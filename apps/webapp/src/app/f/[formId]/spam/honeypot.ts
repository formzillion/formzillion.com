export default async function honeypot(reqBody: any) {
  let { _honeypot } = reqBody;

  if (!_honeypot) {
    console.log("Form submission success!");
    return false;
  }
  console.log("Form submission failed");
  return true;
}
