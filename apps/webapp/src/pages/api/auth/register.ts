import { NextApiRequest, NextApiResponse } from "next";
import { get, kebabCase, snakeCase } from "lodash";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import stripeApi from "@/lib/stripe/stripe-api";
import { PLAN_ID } from "@/utils/stripe.constants";
import { notifyOnSlack } from "@/utils/notifyOnSlack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(500).json({
      success: false,
      message: "Email and password is required for registering an account.",
    });
    return;
  }

  try {
    const checkUser = await prisma.users.findUniqueOrThrow({
      where: {
        email,
      },
    });
    if (checkUser) {
      return res.status(500).json({
        success: false,
        message: "User already registered.",
      });
    }
  } catch (error) {
    console.log(error);
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    return res.status(500).json({
      error,
    });
  }
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
            planName: formattedPlanName || "free",
            planId,
          },
        },
      },
      include: {
        teams: true,
      },
    });
    const teamId = get(user, "teams.0.id", "");
    if (teamId) {
      await prisma.memberships.create({
        data: {
          teamId: teamId,
          userId: user.id,
          accepted: true,
          role: "OWNER",
        },
      });

      // Initial entry for plan metering
      const teamSlug = get(user, "teams.0.slug", "");
      await prisma.plan_metering.create({
        data: {
          teamId: teamId,
          teamSlug: teamSlug,
          planId: planId,
          planName: formattedPlanName || "free",
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

  notifyOnSlack(
    "Login",
    `*New User Registered*\n
        Email ID: ${email}\n`
  );

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
  //Step 3: Get the plan name from Stripe
  const productId = get(subscription, "plan.product", "").toString();
  const productDetails = await stripeApi.productDetail({ productId });
  let planName = get(productDetails, "name", "free");
  const formattedPlanName = snakeCase(planName);
  planName === null ? "free" : planName;

  return {
    customerId: stripeCustomer?.id,
    planName: formattedPlanName,
    planId: subscription?.plan.id,
  };
}
