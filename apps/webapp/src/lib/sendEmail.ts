import sendgrid from "@sendgrid/mail";
import { Resend } from "resend";

export async function sendEmail({
  toEmail,
  subject,
  html,
  provider = "sendgrid",
}: any) {
  const from = "sandeep@formzillion.com";
  try {
    if (provider === "sendgrid") {
      const { SENDGRID_API_KEY }: any = process.env;
      sendgrid.setApiKey(SENDGRID_API_KEY);
      await sendgrid.send({
        from,
        to: toEmail,
        subject,
        html,
      });
    }
    if (provider === "resend") {
      const { RESEND_API_KEY }: any = process.env;
      const resend = new Resend(RESEND_API_KEY);
      await resend.sendEmail({
        from,
        to: toEmail,
        subject,
        html,
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
