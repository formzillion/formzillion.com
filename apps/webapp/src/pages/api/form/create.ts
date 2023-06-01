import { NextApiRequest, NextApiResponse } from "next";
import { get } from "lodash";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import { showErrorToast } from "@/ui/Toast/Toast";

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

    // we'll upsert (update or insert) a plan metering record with formCounter updating or setting by 1
    const planUpsert = await prisma.plan_metering.upsert({
      where: { teamId },
      update: { formCounter: { increment: 1 } },
      create: {
        planId: get(user, "teams.0.planId", ""),
        planName: get(user, "teams.0.planName", "free"),
        teamSlug,
        teamId,
        formCounter: 1,
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

    res.status(201).json({ success: true, data: form });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
