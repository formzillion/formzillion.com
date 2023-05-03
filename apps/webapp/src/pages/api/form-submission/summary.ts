import { NextApiRequest, NextApiResponse } from "next";
import { getUserDetails } from "@/lib/getUserDetails";

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
  let groupId: any = {
    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
  };

  if (type === "daily") {
    groupId = {
      $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
    };
  } else if (type === "monthly") {
    groupId = {
      $dateToString: { format: "%Y-%m", date: "$createdAt" },
    };
  }

  if (groupBy === "country") {
    groupId = "$country";
  }

  const summaryData: any = [];

  return res.status(201).json({ success: true, data: summaryData });
}
