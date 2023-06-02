import { NextApiRequest, NextApiResponse } from "next";
import { get, kebabCase, snakeCase } from "lodash";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import stripeApi from "@/lib/stripe/stripe-api";
import { PLAN_ID } from "@/utils/stripe.constants";
import { validateToken } from "@/utils/tokenService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  }: any = await supabase.auth.getSession();
  const loginEmail: any = session?.user?.email;
  const { email, password, token, toEmail, invitedTeamId } = req.body;

  const validToken = await validateToken({ token, toEmail });
  if (!validToken) {
    return res.status(500).json({ success: false, message: "Invalid Token" });
  }

  if (!email || !password) {
    res.status(500).json({
      success: false,
      message: "Email and password is required for registering an account.",
    });
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // splitting email to form a TeamSlug
  const regex = /\.[^.]*$/;
  const splittedEmail = email.replace(regex, "");

  if (data) {
    const { customerId, planName, planId, fullName } =
      await postRegisterActions({
        email,
      });
    const formattedPlanName = snakeCase(planName);
    const user = await prisma.users.create({
      data: {
        email,
        billingCustomerId: customerId,
        planName: formattedPlanName,
        planId,
        fullName,
        // Create a new team entry and associate it with the user
        teams: {
          create: {
            name: email.split("@")[0],
            type: "personal",
            slug: kebabCase(splittedEmail),
            billingCustomerId: customerId,
            planName: formattedPlanName,
            planId,
          },
        },
      },
      include: {
        teams: true,
      },
    });
    const teamId = get(user, "teams[0].id", "");
    if (teamId) {
      await prisma.memberships.create({
        data: {
          teamId: teamId,
          userId: user.id,
          accepted: true,
          role: "OWNER",
        },
      });
    }

    if (invitedTeamId) {
      await prisma.teams.update({
        where: { id: invitedTeamId },
        data: {
          users: {
            connect: [{ id: user.id }],
          },
        },
      });
      await prisma.memberships.create({
        data: {
          teamId: invitedTeamId,
          userId: user.id,
          accepted: true,
          role: "MEMBER",
        },
      });
    }
  }

  res.status(200).json({ success: true, message: "Registration success" });
}

async function postRegisterActions({ email }: any) {
  const fullName = email && email.split("@")[0];

  const { customerId, planName, planId } =
    await createBillingUserAndSubscription({
      email,
      fullName,
    });
  return { customerId, planName, planId, fullName };
}

export async function createBillingUserAndSubscription({
  email,
  fullName = "",
}: any) {
  //Step 1: Create Customer in Stripe for billing
  const stripeCustomer = await stripeApi.createCustomer({
    email,
    name: fullName,
  });
  //Step 2: Assign Free Plan by Default in Stripe
  const subscription: any = await stripeApi.createSubscription({
    customerId: stripeCustomer?.id,
    priceId: PLAN_ID,
  });
  return {
    customerId: stripeCustomer?.id,
    planName: subscription?.plan?.nickname,
    planId: subscription?.plan.id,
  };
}
