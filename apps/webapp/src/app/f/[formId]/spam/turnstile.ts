export default async function validate(reqBody: any, secretKey: any) {

  const token = reqBody["cf-turnstile-response"];

  let formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", token);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
    cache: "no-store",
  });
  const outcome = await result.json();
  if (outcome.success) {
    return true;
  } else {
    return false;
  }
}
