import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page || 1;
  console.log("🚀 ~ file: search.ts:9 ~ page:", page)
  const limit = 10;

  // const startIndex = (page - 1) * limit;
  const reqBody = req.body;
  const formSubmissions = await prisma.form_submissions.findMany({
    where: {
      id: reqBody.formId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(201).json({ success: true, data: formSubmissions });
}
