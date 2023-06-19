import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    return updateForm(req, res);
  } else if (req.method === "GET") {
    return getFormDetail(req, res);
  } else {
    res.status(405).end("Method Not Allowed");
    return;
  }
}

async function updateForm(req: NextApiRequest, res: NextApiResponse) {
  const { formId }: any = req.query;
  const { name, emailNotifications, submissionArchive, formEnabled } =
    JSON.parse(req.body);

  const form = await prisma.forms.update({
    where: {
      id: formId,
    },
    data: {
      name,
      emailNotifications,
      submissionArchive,
      formEnabled,
    },
  });
  return res.status(201).json({ success: true, data: form });
}

async function getFormDetail(req: NextApiRequest, res: NextApiResponse) {
  const { formId }: any = req.query;

  const form = await prisma.forms.findFirst({
    where: {
      id: formId,
    },
  });

  return res.status(201).json({ success: true, data: form });
}
