import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { isEmpty } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).end("Method Not Allowed");
      return;
    }

    const { autoResponderConfig, formId } = req.body;

    const response = await prisma.forms.update({
      where: { id: formId },
      data: {
        autoResponder: !isEmpty(autoResponderConfig),
        autoResponderConfig,
      },
    });

    return res.status(200).json({ success: true, data: response });
  } catch (error: any) {
    console.log(`Error while updating the auto responder: ${error}`);
    return res.status(500).json({ success: false, message: error.message });
  }
}
