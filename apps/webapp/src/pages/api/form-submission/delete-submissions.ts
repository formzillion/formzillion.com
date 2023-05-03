import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = req.body;

  const deleteFormSubmissions = await prisma.form_submissions.deleteMany({
    where: {
      formId: reqBody.formId,
    },
  });

  return res.status(201).json({ success: true, data: deleteFormSubmissions });
}
