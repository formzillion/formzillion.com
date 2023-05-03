import React from "react";

import { getTimeAgo } from "@/utils/timeAgo";

export default function SubmissionItem({ submission }: any) {
  const {
    id,
    fields = {},
    formId,
    createdAt,
    updatedAt,
    ip,
  } = submission || {};

  return (
    <>
      <div className="broder-[#444444] border bg-black py-[30px] px-[22px] dark:text-white grid grid-cols-8 mb-5">
        <div className="col-span-3 flex gap-3">
          <div>
            <input
              type="checkbox"
              id="submission"
              name="submission"
              value=""
            ></input>
          </div>
          <div className="space-y-2">
            <div>
              <p>Name</p>
              <p>{fields.name}</p>
            </div>
            <div>
              <p>Email</p>
              <p>{fields.email}</p>
            </div>
            <div>
              <p>Request</p>
              <p>{fields.message}</p>
            </div>
          </div>
        </div>
        <div className="col-span-3 space-y-2">
          <div>
            <p>IP Address</p>
            <p>{ip}</p>
          </div>
          <div>
            <p>Country</p>
            <p>IN</p>
          </div>
          <div>
            <p>User Agent</p>
            <p>
              Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail
              Firefox/firefoxversion
            </p>
          </div>
        </div>
        <div className="col-span-2 text-end">
          <div className="w-full mb-3">
            <span className="dark:bg-orange-500 px-4 py-3 rounded-3xl text-sm text-gray-100">
              New
            </span>
          </div>
          <p>Submitted {getTimeAgo(createdAt)}</p>
        </div>
      </div>
    </>
  );
}
