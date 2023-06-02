import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

import { validateSpam } from "./spam";
import fzProducer from "./fzProducer";
import honeypot from "./spam/honeypot";
import customHoneypots from "./spam/customHoneypot";

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
  })) || {
    redirectUrl: "",
    spamProvider: "",
    spamConfig: {},
    customSpamWords: [],
    customHoneypot: "",
  };
  const spamProvider = formData?.spamProvider;
  const spamConfig = formData?.spamConfig;
  const customSpamWords = formData?.customSpamWords;
  const customHoneypot = formData?.customHoneypot;
  let isSpam = false;
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

  const formSubmission = await prisma.form_submissions.create({
    data: { fields: formFields, formId, isSpam: isSpam },
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
}
