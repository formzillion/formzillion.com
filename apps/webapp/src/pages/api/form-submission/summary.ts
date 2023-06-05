import { NextApiRequest, NextApiResponse } from "next";
import { getUserDetails } from "@/lib/getUserDetails";
import { get } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    skip = 0,
    limit = 10,
    type,
    formId,
    groupBy = "createdAt",
  } = JSON.parse(req.body);

  let summaryData: any;

  const dates: any = {
    daily: 1,
    weekly: 7,
    monthly: 30,
  };

  if (groupBy === "country") {
    summaryData = await prisma.form_submissions.groupBy({
      by: [groupBy],
      where: {
        formId,
      },
      _count: {
        formId: true,
      },
    });
  } else {
    summaryData = await prisma.form_submissions.groupBy({
      by: ["formId"],
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - dates[type])),
          lte: new Date(),
        },
        formId,
      },
      _count: {
        formId: true,
      },
    });
  }

  summaryData = get(summaryData, "0", []);

  return res.status(201).json({ success: true, data: summaryData });
}
