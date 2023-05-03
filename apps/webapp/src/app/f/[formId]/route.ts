import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { isEmpty } from "lodash";
import prisma from "@/lib/prisma";

import { validateSpam } from "./spam";

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
  })) || { redirectUrl: "", spamProvider: "", spamConfig: {} };

  const spamProvider = formData?.spamProvider;
  const spamConfig = formData?.spamConfig;
  let isSpam = false;

  if (!isEmpty(spamProvider)) {
    isSpam = await validateSpam(formFields, spamConfig, spamProvider);
  }

  const formSubmission = await prisma.form_submissions.create({
    data: { fields: formFields, formId, isSpam: isSpam },
  });

  // Send to Webhooks
  fetch(`${process.env.WB_WEBHOOK_URL}/formzillion/events`, {
    cache: "no-cache",
    method: "POST",
    body: JSON.stringify({
      eventName: "formSubmission",
      eventData: {
        formId,
        formSubmissionData: formSubmission,
        formData,
      },
    }),
  });

  if (isSpam) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?status=failed&referer=${referer}`
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
