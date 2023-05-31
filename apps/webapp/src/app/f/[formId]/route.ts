import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

import { validateSpam } from "./spam";
import fzProducer from "./fzProducer";

type FormDataType = {
  spamProvider: string;
  spamConfig: {};
  redirectUrl: string;
  teamId: string;
};

const planSubmissionLimit = {
  free: 50,
  basic: 250,
  standard: 1000,
  premium: 6000,
  agency: 30000,
} as { [key: string]: number };

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { formId: string };
  }
) {
  const reqBody: FormData = await req.formData();
  const formFields: any = {};
  reqBody.forEach((value, key) => (formFields[key] = value));
  const formId = params.formId;
  const referer = headers().get("referer");

  const formData = (await prisma.forms.findFirst({
    where: {
      id: formId,
    },
  })) as FormDataType;

  const currentPlanInfo: any = await prisma.plan_metering.findFirst({
    where: {
      teamId: formData.teamId,
    },
    select: {
      planId: true,
      planName: true,
      submissionCounter: true,
    },
  });

  const { planName, submissionCounter } = currentPlanInfo || {};
  const isAllowed = submissionCounter < planSubmissionLimit[planName];

  if (isAllowed) {
    const spamProvider = formData?.spamProvider;
    const spamConfig = formData?.spamConfig;
    let isSpam = false;

    if (!isEmpty(spamProvider)) {
      isSpam = await validateSpam(formFields, spamConfig, spamProvider);
    }

    const formSubmission = await prisma.form_submissions.create({
      data: { fields: formFields, formId, isSpam: isSpam },
    });

    // Incrementing the submission counter in plan metering
    await prisma.plan_metering.update({
      where: { teamId: formData.teamId },
      data: { submissionCounter: { increment: 1 } },
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
      if (isEmpty(formData?.redirectUrl)) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?formSubmission=${formSubmission.id}&status=OK&referer=${referer}&formId=${formId}`
        );
      } else {
        return NextResponse.redirect(
          `${formData?.redirectUrl}?formSubmission=${formSubmission.id}&status=OK&referer=${referer}`
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
