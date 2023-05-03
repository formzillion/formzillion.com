import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = req.body;
  const count = await prisma.form_submissions.count({
    where: {
      formId: reqBody.formId,
    },
  });

  return res.status(201).json({ success: true, data: count });
}
