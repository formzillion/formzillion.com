import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import { invitationEmail } from "./invitationEmail";
import getUserSession from "../userSession/getUserSession";
import { getToken } from "@/utils/tokenService";
import checkPlan from "@/utils/checkPlan";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { emailsToInvite, teamSlug, role, plan } = req.body;
    const toProceed = checkPlan(plan);

    if (!toProceed) {
      return res
        .status(400)
        .json({ success: false, message: "Please upgrade plan" });
    }
    const { currentUser } = await getUserSession(req, res);
    const { email: currentUserEmail, fullName } = currentUser;

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

    if (newEmails) {
      for (const email of newEmails) {
        const token = await getToken({ length: 36, email });
        await sendEmail({
          provider: "sendgrid",
          toEmail: email,
          subject: "Team Invitation",
          html: invitationEmail({
            inviterEmail: currentUserEmail,
            inviterName: fullName,
            toEmail: email,
            teamId: updatedTeam.id,
            token,
          }),
        });
      }
    }
    res.status(201).json({ success: true, data: updatedTeam });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
