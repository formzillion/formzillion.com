import { NextApiRequest, NextApiResponse } from "next";
import geoip from "geoip-country";
import prisma from "@/lib/prisma";

import { AkismetClient } from "akismet-api";

const key = "6db1e8edbd58";
const blog = "https://formzillion.com";
const client = new AkismetClient({ key, blog });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = JSON.parse(req.body);
  const ip =
    req.headers["x-forwarded-for"]?.toString() ||
    req.socket.remoteAddress ||
    "";
  const geo = geoip.lookup(ip.toString());
  const country = geo?.country || "";

  const { name, fields } = JSON.parse(req.body);

  const isSpam = await client.checkSpam({
    ip,
    useragent: req.headers["user-agent"],
    ...fields,
  });

  const formSubmission = await prisma.form_submissions.create({
    data: {
      fields,
      formId: reqBody.formId,
      ip: ip,
      country,
    },
  });

  return res.status(201).json({ success: true, data: formSubmission });
}
