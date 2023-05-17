import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page: any = req.query.page || 1;
  const limit = 10;

  const startIndex = (page - 1) * limit;
  const {  formId } = req.body;

  try {
    const formSubmissions = await prisma.form_submissions.findMany({
      skip: startIndex,
      take: limit,
      where: {
        formId: formId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(formSubmissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}