import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    return updateProfile(req, res);
  }
  {
    return res.status(405).end("Method Not Allowed");
  }
}

async function updateProfile(req: NextApiRequest, res: NextApiResponse) {
  const reqBody = JSON.parse(req.body);
  const data = reqBody.formData;

  const email = data.email;
  try {
    const response = await prisma.users.update({
      where: {
        email,
      },
      data: {
        ...data,
      },
    });

    res.status(201).json({ success: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}
