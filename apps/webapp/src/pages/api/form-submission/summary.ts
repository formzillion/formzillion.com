import { NextApiRequest, NextApiResponse } from "next";
import { get } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    type,
    formId,
    groupBy = "createdAt",
  } = JSON.parse(req.body);

  let summaryData: any;
  let dateFilter: any = {};

  if (type === "daily") {
    dateFilter = {
      gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      lte: new Date(),
    };
  } else if (type === "monthly") {
    dateFilter = {
      gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      lte: new Date(),
    };
  } else if (type === "weekly") {
    dateFilter = {
      gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      lte: new Date(),
    };
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
  } else {
    summaryData = await prisma.form_submissions.groupBy({
      by: ["formId"],
      where: {
        createdAt: dateFilter,
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
