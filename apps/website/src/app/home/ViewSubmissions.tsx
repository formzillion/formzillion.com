import React from "react";
import Image from "next/image";

import submissionList from "public/screenshots/submissions-list.png";

export default function ViewSubmissions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-gray-50 rounded-md p-4 sm:p-8 md:p-12">
      <div className="max-w-xl p-1 sm:p-2 md:p-4">
        <h3 className="text-2xl text-gray-900 font-semibold mb-3 md:mb-6">
          <span className="inline-block sm:hidden">View your submissions</span>
          <span className="hidden sm:inline-block">
            View your form submissions anytime, anywhere
          </span>
        </h3>
        <div className="text-lg text-gray-700">
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>Send form submissions as a lead in CRM</div>
          </div>
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>Send form submissions as a Slack message</div>
          </div>
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>Send form submissions as to Google Sheets</div>
          </div>
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>Send form submissions as an Emails</div>
          </div>
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>Export your form submissions as CSV</div>
          </div>

          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>
              Integrate with your favorite tools via{" "}
              <a className="link" href="/features/zapier/">
                Zapier
              </a>
              ,{" "}
              <a className="link" href="/features/make/">
                Make
              </a>{" "}
              and{" "}
              <a className="link" href="/features/integromat/">
                Integromat
              </a>
            </div>
          </div>
          <div className="flex py-2">
            <div className="text-gray-300 pr-2">•</div>
            <div>Webhook integration</div>
          </div>
          <div className="hidden md:flex items-center mt-8">
            <div className="text-center">
              <Image
                src="brands/gmail.svg"
                alt="Email"
                className="rounded w-16 p-2 "
                width={20}
                height={20}
              />
              <div className="text-sm font-semibold">Email</div>
            </div>
            <div className="mr-12"></div>
            <div className="text-center">
              <Image
                src="brands/slack.svg"
                alt="Slack"
                className="rounded w-16 p-2 "
                width={20}
                height={20}
              />
              <div className="text-sm font-semibold">Slack</div>
            </div>
            <div className="mr-12"></div>
            <div className="text-center">
              <Image
                src="brands/zapier.svg"
                alt="Slack"
                className="rounded w-16 p-2 "
                width={20}
                height={20}
              />
              <div className="text-sm font-semibold">Zapier</div>
            </div>
            <div className="mr-12"></div>
            <div className="text-center">
              <Image
                src="brands/webhooks.svg"
                alt="Webhooks"
                className="rounded w-16 p-2 "
                width={20}
                height={20}
              />
              <div className="text-sm font-semibold">Webhooks</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          src={submissionList}
          alt="Submissions list"
          aria-label="Submissions list"
          className="border rounded-md shadow-md"
        />
      </div>
    </div>
  );
}
