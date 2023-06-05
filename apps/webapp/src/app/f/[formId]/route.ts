import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { get, isEmpty, snakeCase } from "lodash";
import prisma from "@/lib/prisma";
import { planSubmissionLimit } from "@/utils/plans.constants";
import { validateSpam } from "./spam";
import fzProducer from "./fzProducer";
import honeypot from "./spam/honeypot";
import customHoneypots from "./spam/customHoneypot";

type FormDataType = {
  customHoneypot: string;
  customSpamWords: string[];
  spamProvider: string;
  spamConfig: {};
  redirectUrl: string;
  teamId: string;
  team: any;
};

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { formId: string };
  }
) {
  const reqBody: FormData = await req.formData();
  const formFields: any = {};
  reqBody.forEach((value, key) => (formFields[key] = value));
  const ip = get(req, "ip", "");
  const country = get(req, "geo.country", "");
  const formId = params.formId;
  const referer = headers().get("referer");

  const formData = (await prisma.forms.findFirst({
    where: {
      id: formId,
    },
    include: {
      team: {
        select: {
          id: true,
          slug: true,
          planId: true,
          planName: true,
        },
      },
    },
  })) as FormDataType;

  const updatedCounter: any = await prisma.plan_metering.upsert({
    where: {
      teamId: formData.teamId,
    },
    update: {
      submissionCounter: {
        increment: 1,
      },
    },
    create: {
      teamId: formData?.teamId,
      planId: formData?.team?.planId,
      planName: snakeCase(formData?.team?.planName) || "free",
      teamSlug: formData?.team?.slug,
      submissionCounter: 1,
      formCounter: 1,
      memberCounter: 1,
    },
    select: {
      planName: true,
      submissionCounter: true,
    },
  });

  const { planName, submissionCounter } = updatedCounter || {};
  const isAllowed =
    submissionCounter < planSubmissionLimit[snakeCase(planName)];

  if (isAllowed) {
    const spamProvider = formData?.spamProvider;
    const spamConfig = formData?.spamConfig;
    let isSpam = false;
    const customSpamWords = formData?.customSpamWords;
    const customHoneypot = formData?.customHoneypot;
    let redirectURL = formData.redirectUrl;

    if (!isEmpty(customSpamWords)) {
      isSpam = await validateSpam(formFields, customSpamWords, "customWords");
    }
    if (!isEmpty(customHoneypot)) {
      isSpam = await customHoneypots(formFields, customHoneypot);
    }
    if (!isEmpty(spamProvider)) {
      isSpam = await validateSpam(formFields, spamConfig, spamProvider);
    }
    if ("_honeypot" in formFields) {
      isSpam = await honeypot(formFields);
    }
    if ("_redirect" in formFields) {
      redirectURL = formFields["_redirect"];
    }

    const formSubmission = await prisma.form_submissions.create({
      data: { fields: formFields, formId, isSpam: isSpam, ip, country },
    });

    if (isSpam) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?status=failed&referer=${referer}`
      );
    }

    // Send form data to webhooks if not local environment
    try {
      const queueData = {
        eventName: "formSubmission",
        eventData: {
          formId,
          formSubmissionData: formSubmission,
          formData,
        },
      };
      if (["development", "production"].includes(process.env.NODE_ENV)) {
        fetch(`${process.env.WB_WEBHOOK_URL}/formzillion/events`, {
          cache: "no-cache",
          method: "POST",
          body: JSON.stringify(queueData),
        });
      } else {
        await fzProducer(queueData);
      }
    } catch (e: any) {
      console.log(
        "Error occured for pushing the form submission data to fz_action Queue",
        e.message
      );
    }

    try {
      if (isEmpty(redirectURL)) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?formSubmission=${formSubmission.id}&status=OK&referer=${referer}&formId=${formId}`
        );
      } else {
        return NextResponse.redirect(
          `${redirectURL}?formSubmission=${formSubmission.id}&status=OK&referer=${referer}`
        );
      }
    } catch (e) {
      console.log(e);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?formId=${formSubmission.id}&status=failed&referer=${referer}`
      );
    }
  } else {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?formId=${formId}&status=failed&referer=${referer}`
    );
  }
}
