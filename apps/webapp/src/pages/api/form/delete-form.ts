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

    const { formId } = req.body;
    const formData = await prisma.forms.findFirst({
      where: {
        id: formId,
      },
    });

    if (formData) {
      await prisma.forms.delete({
        where: {
          id: formId,
        },
      });

      // Decrementing the forms counter for the Plan
      await prisma.plan_metering.update({
        where: { teamId: formData.teamId },
        data: { formCounter: { decrement: 1 } },
      });
      console.log(`Form id ${formId} deleted successfully`);
    } else {
      console.log(`No form found with id ${formId}`);
    }

    return res.status(200).json({ success: true, data: "response" });
  } catch (error: any) {
    console.log(`Error in delete a form: ${error}`);
    return res.status(500).json({ success: false, message: error.message });
  }
}
