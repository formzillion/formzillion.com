import { NextApiRequest, NextApiResponse } from "next";
import { getUserDetails } from "@/lib/getUserDetails";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  const {
    emails
  } = JSON.parse(req.body);
  const user = await getUserDetails(req, res);
  const { teamId }: any = req.query;
  const userEmails = emails?.split(",");
  const users = await prisma.users.findMany({
    where: {
      email: {
        in: userEmails,
      },
    },
  });
  const userIds = users.map((user: any) => user.id);  

  await prisma.teams.update({
    where: {
      id: teamId,
    },
    data: {
      users: {
        connect: userIds.map((id: any) => ({ id })),
      },
    },    
  })
  return res.status(201).json({ success: true });
}
