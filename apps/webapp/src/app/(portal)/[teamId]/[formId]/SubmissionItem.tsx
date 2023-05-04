import React, { useState } from "react";
import { getTimeAgo } from "@/utils/timeAgo";


export default function SubmissionItem({ submission, isChecked, setCheckedIds }: any) {
  const [change, setChange] = useState(false);
  const {
    fields = {},
    country = "",
    createdAt,
    ip,
    isSpam = false,
    id,
  } = submission || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(e.target.checked);
    setCheckedIds(id);
  };

  return (
    <>
      <div className="broder-[#444444] border dark:bg-black py-[30px] px-[22px] dark:text-white grid grid-cols-8 mb-5">
        <div className="col-span-3 flex gap-3">
          <div>
            <input
              type="checkbox"
              id="submission"
              name="submission"
              value=""
              checked={change || isChecked}
              onChange={(id) => handleChange(id)}
            />
          </div>
          <div className="space-y-2">
            {/* getting 2 times formsubmission data */}
            {/* {Object.keys(fields).map((key, idx) => {
              return (
                <div key={idx}>
                  <p>{startCase(key)}</p>
                  <p>{fields[key]}</p>
                </div>
              );
            })} */}
            <div>
              <p className="text-gray-400">Name</p>
              <p>{fields.name}</p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p>{fields.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Request</p>
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
            <p>{country}</p>
          </div>
        </div>
        <div className="col-span-2 text-end relative">
          <div className="w-full mb-3">
            <span className="bg-orange-500 px-4 py-3 text-sm text-gray-100">
              New
            </span>
          </div>
          <p>Submitted {getTimeAgo(createdAt)}</p>
          {isSpam && (
            <p className="absolute right-0 bottom-0 border p-2 border-red-700 ">
              Spam
            </p>
          )}
        </div>
      </div>
    </>
  );
}
