import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty, lowerCase } from "lodash";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import { getToken } from "@/utils/tokenService";
import checkPlan from "@/utils/checkPlan";
import getUserSession from "../userSession/getUserSession";
import { invitationEmail } from "./invitationEmail";
import { planMemberLimit } from "@/utils/plans.constants";

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

    let currentMembersCount = await prisma.plan_metering.findFirst({
      where: { teamSlug },
    });

    if (isEmpty(currentMembersCount)) {
      currentMembersCount = await prisma.plan_metering.create({
        data: {
          teamId: teamSlug,
          planId: plan,
          planName: plan || "free",
          teamSlug: teamSlug,
          memberCounter: 1,
        },
      });
    }

    const limit = planMemberLimit[lowerCase(plan)];
    const isAllowed = currentMembersCount.memberCounter < limit;

    if (!isAllowed) {
      return res
        .status(400)
        .json({ success: false, message: "Please upgrade plan" });
    }

    const emails = emailsToInvite
      .split(",")
      .map((e: string) => e.trim())
      .filter((e: string) => e !== "");

    // Check for Entered emails exceeds the plan limits
    if (emails.length > limit) {
      return res.status(400).json({
        success: false,
        message: `Exceeded the limit of ${limit} members! Please upgrade your plan`,
      });
    }

    const { currentUser } = await getUserSession(req, res);
    const { email: currentUserEmail, fullName } = currentUser;

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

    const updatedTeam: any = await prisma.teams.update({
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

    // Inserting or Updating the Plan Metering for membersCounter
    await prisma.plan_metering.upsert({
      where: {
        teamId: updatedTeam.id,
      },
      update: {
        memberCounter: {
          increment: emails.length,
        },
      },
      create: {
        teamSlug: updatedTeam.slug,
        planId: updatedTeam.planId,
        planName: updatedTeam.planName || "free",
        teamId: updatedTeam.id,
        memberCounter: emails.length,
      },
    });
    return res.status(201).json({ success: true, data: updatedTeam });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
