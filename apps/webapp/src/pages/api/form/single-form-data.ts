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
  const { formId } = reqBody;
  const formData = await prisma.forms.findFirst({
    where: {
      id: formId,
    },
  });
  return res.status(201).json({ success: true, data: formData });
}
