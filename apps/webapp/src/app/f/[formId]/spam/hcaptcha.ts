import { verify } from "hcaptcha";

export async function hcaptcha(reqBody: any, secretKey: any) {
  const token = reqBody["h-captcha-response"];

  try {
    const data = await verify(secretKey, token);
    if (data.success === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
