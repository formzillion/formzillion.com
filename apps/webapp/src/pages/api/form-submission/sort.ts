import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { formId, sortBy } = req.body;

  if (sortBy === "asc" || sortBy === "desc") {
    const data = await prisma.form_submissions.findMany({
      where: {
        formId: formId,
      },
      orderBy: {
        createdAt: sortBy,
      },
    });

    res.status(200).json(data);
  }
}
