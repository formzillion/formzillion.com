import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).end("Method Not Allowed");
      return;
    }

    const { emails, formId } = req.body || {};

    // Removing the white spcaes and filtering the valid emails
    const sendToEmail = emails
      .split(",")
      .map((e: string) => e.trim())
      .filter((e: string) => e !== "");

    const response = await prisma.forms.update({
      where: {
        id: formId,
      },
      data: {
        sendToEmail,
      },
    });

    return res.status(200).json({ success: true, data: response });
  } catch (error: any) {
    console.log(`Error in update emails fetch: ${error}`);
    return res.status(500).json({ success: false, message: error.message });
  }
}
