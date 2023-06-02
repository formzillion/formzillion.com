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
  if (type === "daily") {
    summaryData = await prisma.form_submissions.groupBy({
      by: ["formId"],
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 1)),
          lte: new Date(),
        },
        formId,
      },
      _count: {
        formId: true,
      },
    });
  } else if (type === "monthly") {
    summaryData = await prisma.form_submissions.groupBy({
      by: ["formId"],
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          lte: new Date(),
        },
        formId,
      },
      _count: {
        formId: true,
      },
    });
  } else if (type === "weekly") {
    summaryData = await prisma.form_submissions.groupBy({
      by: ["formId"],
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          lte: new Date(),
        },
        formId,
      },
      _count: {
        formId: true,
      },
    });
  }

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
  }
  summaryData = get(summaryData, "0", []);

  return res.status(201).json({ success: true, data: summaryData });
}
