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
  const {  id,isSpam } = reqBody;
  const response = await prisma.form_submissions.updateMany({
    where: {
      id: id,
    },
    data: {
      isSpam: isSpam,
    },
  });

  return res.status(201).json({ success: true, data: response });
}
