import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page: any = req.query.page || 1;
  const limit = 10;

  const startIndex = (page - 1) * limit;
  const reqBody = req.body;

  const formSubmissions = await prisma.form_submissions.findMany({
    skip: startIndex,
    take: limit,
    where: {
      id: reqBody.formId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalPosts = await prisma.form_submissions.count();
  const totalPages = Math.ceil(totalPosts / limit);

  res.status(200).json({
    data: formSubmissions,
    currentPage: page,
    totalPages: totalPages,
  });
}
