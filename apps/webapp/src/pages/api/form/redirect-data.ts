import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import checkPlan from "@/utils/checkPlan";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  const reqBody = JSON.parse(req.body);

  if (reqBody.type == "customContent" || reqBody.type == "redirectionUrl") {
    const toProceed = checkPlan(reqBody.plan);

    if (!toProceed) {
      return res
        .status(400)
        .json({ success: false, message: "Please upgrade plan" });
    }
  }
  if (reqBody.type == "default" || reqBody.type == "customContent") {
    const response = await prisma.forms.update({
      where: {
        id: reqBody.formId,
      },
      data: {
        redirectData: {
          title: reqBody.title,
          message: reqBody.message,
          button: reqBody.buttonText,
          buttonUrl: reqBody.buttonUrl,
        },
        redirectUrl: "",
      },
    });
  } else if (reqBody.type == "redirectionUrl") {
    const response = await prisma.forms.update({
      where: {
        id: reqBody.formId,
      },
      data: {
        redirectUrl: reqBody.redirectUrl,
        redirectData: {},
      },
    });
  }
  return res.status(201).json({ success: true });
}
