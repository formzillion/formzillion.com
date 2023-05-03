import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apps = await prisma.apps.findMany({
    where: { status: "active" },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
    }
  });

  return res.status(200).json({ success: true, data: apps });
}
