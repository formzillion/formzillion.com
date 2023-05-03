import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { emailsToInvite, teamSlug, role } = req.body;
    const emails = emailsToInvite.includes(",")
      ? emailsToInvite.split(",")
      : [emailsToInvite];
    const existingUsers = await prisma.users.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    const existingEmails = existingUsers.map((user: any) => user.email);
    const newEmails = emails.filter(
      (email: any) => !existingEmails.includes(email)
    );

    const updatedTeam = await prisma.teams.update({
      where: { slug: teamSlug },
      data: {
        users: {
          connect: [...existingUsers.map((user: any) => ({ id: user.id }))],
        },
      },
    });

    for (const user of existingUsers) {
      await prisma.memberships.create({
        data: {
          teamId: updatedTeam.id,
          userId: user.id,
          accepted: true,
          role: role,
        },
      });
    }

    await prisma.team_invitations.createMany({
      data: newEmails.map((email: any) => ({
        email,
        teamId: updatedTeam.id,
      })),
    });
    res.status(201).json({ success: true, data: updatedTeam });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
