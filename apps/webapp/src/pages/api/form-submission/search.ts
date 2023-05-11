import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {  filterFields ={},formId } = req.body;
  const fieldPath = Object.keys(filterFields);
  const searchedString = filterFields[fieldPath[0]] || "";
  try {
    const results = await prisma.form_submissions.findMany({
      where: {
        formId: formId,
        fields: {
          path: fieldPath,
          string_contains: searchedString,
        },
      },
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
