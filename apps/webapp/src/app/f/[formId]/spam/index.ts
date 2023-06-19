import recaptchav2 from "./recaptchav2";
import recaptchav3 from "./recaptchav3";
import { hcaptcha } from "./hcaptcha";
import botpoison from "./botpoison";
import turnstile from "./turnstile";
import honeypot from "./honeypot";
import customWords from "./customWords";

export async function validateSpam(
  reqBody: any,
  spamConfig: any,
  spamProvider: any
) {
  let secretKey = Object.values(spamConfig)[0];
  let provider = spamProvider;

  let isSpam: any = false;
  if (provider === "recaptchav2") {
    isSpam = await recaptchav2(reqBody, secretKey);
  } else if (provider === "botpoison") {
    isSpam = await botpoison(reqBody, secretKey);
  } else if (provider === "hcaptcha") {
    isSpam = await hcaptcha(reqBody, secretKey);
  } else if (provider === "turnstile") {
    isSpam = await turnstile(reqBody, secretKey);
  } else if (provider === "recaptchav3") {
    isSpam = await recaptchav3(reqBody, secretKey);
  } else if (provider === "honeypot") {
    isSpam = await honeypot(reqBody);
  } else if (provider === "customWords") {
    isSpam = await customWords(reqBody, spamConfig);
  }

  return !isSpam;
}
