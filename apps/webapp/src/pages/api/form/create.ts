import { NextApiRequest, NextApiResponse } from "next";
import { get, isEmpty, lowerCase } from "lodash";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import { showErrorToast } from "@/ui/Toast/Toast";
import { planFormLimit } from "@/utils/plans.constants";
import { notifyOnSlack } from "@/utils/notifyOnSlack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, teamSlug, sendToEmail } = JSON.parse(req.body);

    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const { data } = await supabase.auth.getSession();
    const email = get(data, "session.user.email", "");

    const user: any = await prisma.users.findFirst({
      where: { email },
      include: {
        teams: {
          where: { slug: teamSlug },
          select: {
            id: true,
            planId: true,
            planName: true,
          },
        },
      },
    });

    const emails = sendToEmail
      .split(",")
      .map((e: string) => e.trim())
      .filter((e: string) => e !== "");

    const teamId = get(user, "teams.0.id", "");

    if (teamId === "") {
      showErrorToast("Team not found");
      return res.status(404).end();
    }

    // Fetch the current form created count
    let currentFormCount = await prisma.plan_metering.findFirst({
      where: { teamId },
      select: { id: true, planName: true, formCounter: true },
    });

    if (isEmpty(currentFormCount)) {
      currentFormCount = await prisma.plan_metering.create({
        data: {
          teamId,
          planId: get(user, "teams.0.planId", ""),
          planName: get(user, "teams.0.planName", "free"),
          teamSlug: teamSlug,
          formCounter: 1,
        },
      });
    }

    const limit = planFormLimit[lowerCase(currentFormCount?.planName)];
    const isAllowed = currentFormCount.formCounter < limit;

    if (!isAllowed) {
      return res.status(200).json({
        success: false,
        message: `Form creation limit reached! Please upgrade your plan to continue.`,
      });
    }

    const form = await prisma.forms.create({
      data: {
        name,
        email,
        formEnabled: true,
        emailNotifications: true,
        sendToEmail: emails,
        autoResponder: false,
        autoResponderConfig: {},
        team: {
          connect: {
            id: teamId,
          },
        },
      },
    });

    // Increment form counter
    await prisma.plan_metering.update({
      where: { id: currentFormCount.id },
      data: {
        formCounter: {
          increment: 1,
        },
      },
    });

    /* Creating a Default Workflow for created Form */
    await prisma.workflows.create({
      data: {
        formId: form.id,
        teamId: teamId,
        userId: user.id,
        name: `${name} Flow`,
        status: "active",
      },
    });

    notifyOnSlack(
      "Form Creation",
      `*New Form Created*\n
          Form Name: ${name}\n
          Created By: ${email}\n
          teamSlug: ${teamSlug}`
    );

    res
      .status(201)
      .json({ success: true, data: form, message: "Form created" });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
