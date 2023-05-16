import React from "react";
import airtable from "public/brands/airtable.png";
import webhooks from "public/brands/webhooks.png";
import typeform from "public/brands/typeform.png";
import slack from "public/brands/slack.png";
import sendgrid from "public/brands/sendgrid.png";
import mailerlite from "public/brands/mailerlite.png";
import mailchimp from "public/brands/mailchimp.png";
import freshdesk from "public/brands/freshdesk.png";
import Image from "next/image";
import { startCase } from "lodash";

export default function ThirdPartyApps() {
  const apps = [
    {
      name: "slack",
      image: slack,
    },
    {
      name: "webhooks",
      image: webhooks,
    },
    {
      name: "airtable",
      image: airtable,
    },
    {
      name: "typeform",
      image: typeform,
    },
    {
      name: "sendgrid",
      image: sendgrid,
    },
    {
      name: "mailerlite",
      image: mailerlite,
    },
    {
      name: "mailchimp",
      image: mailchimp,
    },
    {
      name: "freshdesk",
      image: freshdesk,
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  border-gray-600 rounded-xl px-2 py-2 max-w-4xl mx-auto">
      {apps.map((item: any, idx) => (
        <div className="flex items-center" key={idx}>
          <Image src={item.image} alt={item.name} className="w-10" />
          <p className="ml-2">{startCase(item.name)}</p>
        </div>
      ))}
    </div>
  );
}
