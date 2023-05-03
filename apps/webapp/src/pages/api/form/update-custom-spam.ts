import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  const reqBody = JSON.parse(req.body);
  const { customHoneypot, customSpamWords, formId } = reqBody;
  const customSpamArray = customSpamWords.split(",")

  const response = await prisma.forms.update({
    where: {
      id: formId,
    },
    data: {
      customHoneypot: customHoneypot,
      customSpamWords: customSpamArray,
    },
  });

  return res.status(201).json({ success: true, data: response });
}
