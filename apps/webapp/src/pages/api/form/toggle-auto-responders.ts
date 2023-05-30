import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import checkPlan from "@/utils/checkPlan";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).end("Method Not Allowed");
      return;
    }

    const { isEnable, formId, plan } = req.body;

    const toProceed = checkPlan(plan);

    if (!toProceed) {
      return res.status(400).json({ success: false, message: "Invalid Plan" });
    }

    const response = await prisma.forms.update({
      where: { id: formId },
      data: { autoResponder: isEnable },
    });

    return res.status(200).json({ success: true, data: response });
  } catch (error: any) {
    console.log(`Error while toggling the auto responder: ${error}`);
    return res.status(500).json({ success: false, message: error.message });
  }
}
