import checkPlan from "@/utils/checkPlan";
import { NextApiRequest, NextApiResponse } from "next";

const { WB_WEBHOOK_URL } = process.env;
const webhookUrl = `${WB_WEBHOOK_URL}/formzillion/events`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { formId, exportDays, userEmail, plan } = req.body;
    
    const toProceed = checkPlan(plan);

    if (!toProceed) {
      return res
        .status(400)
        .json({ success: false, message: "Please upgrade plan" });
    }
    const response = await fetch(webhookUrl, {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify({
        eventName: "export-submissions",
        eventData: {
          formId,
          exportDays,
          userEmail,
        },
      }),
    });

    res.status(201).json({ success: true, data: response });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
