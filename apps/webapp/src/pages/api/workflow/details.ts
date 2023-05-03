import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { formId } = req.body || {};
    if (!formId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid formId" });
    }

    const workflow = await prisma.workflows.findFirst({
      where: { formId },
    });

    const submissionCount = await prisma.form_submissions.count({
      where: { formId },
    });

    return res
      .status(200)
      .json({ success: true, data: { workflow, submissionCount } });
  } catch (error: any) {
    console.log("Error in workflows details ", error);

    return res.status(500).json({ success: false, message: error.message });
  }
}
