import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { sortBy } = req.query

  let data

  if (sortBy === 'asc') {
    data = await prisma.form_submissions.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  } else if (sortBy === 'desc') {
    data = await prisma.form_submissions.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    data = await prisma.form_submissions.findMany()
  }

  res.status(200).json(data)
}
