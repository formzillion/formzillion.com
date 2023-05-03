import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = req.body;
  const formSubmissions = await prisma.form_submissions.findMany({
    where: {
      formId: reqBody.formId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(201).json({ success: true, data: formSubmissions });
}
