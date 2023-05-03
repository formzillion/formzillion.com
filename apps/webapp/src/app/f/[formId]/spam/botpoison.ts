import Botpoison from "@botpoison/node";

export default async function validate(reqBody: any, secretKey: any) {
  const botpoison = new Botpoison({
    secretKey,
  });

  const { _botpoison } = reqBody;

  const { ok } = await botpoison.verify(_botpoison);
  if (!ok) {
    // throw new Error("Invalid Botpoison solution");
    return ok;
  } else {
    return ok;
  }
}
