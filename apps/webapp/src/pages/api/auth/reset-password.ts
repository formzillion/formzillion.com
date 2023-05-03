import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  const user = await prisma.users.findFirst({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    throw new Error("You haven't registered yet");
  }

  res.status(200).json({ message: "success" });
}
