import { stringify } from "querystring";

export default async function recaptchav3(reqBody: any, secretKey: any) {
  const grecaptcha = reqBody["g-recaptcha-response"];

  if (!grecaptcha) {
    return { success: false, msg: "Please select captcha" };
  }

  const query = stringify({
    secret: secretKey,
    response: grecaptcha,
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  try {
    const response = await fetch(verifyURL);

    const body = await response.json();
    if (body.success !== undefined) {
      return body.success;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
