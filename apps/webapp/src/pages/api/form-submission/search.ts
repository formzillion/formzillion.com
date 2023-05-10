import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchTerm, formId } = req.body;

  try {
    const results = await prisma.form_submissions.findMany({
      where: {
        OR: [{ fields: searchTerm }],
      },
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
