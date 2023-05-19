import React, { useState } from "react";
import { getTimeAgo } from "@/utils/timeAgo";
import {
  ChatBubbleBottomCenterIcon,
  ClockIcon,
  EnvelopeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { isEmpty } from "lodash";

export default function SubmissionItem({
  submission,
  isChecked,
  setCheckedIds,
}: any) {
  const [change, setChange] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showAllFields, setShowAllFields] = useState(false);

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
  let name;
  if (submission && submission.fields && submission.fields.name) {
    const [firstName = "", lastName = ""] = submission.fields.name?.split(" ");
    name = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
  } else {
    console.log("error");
  }

  const excludeFields = [
    "name",
    "email",
    "message",
    "g-recaptcha-response",
    "platform",
  ];
  return (
    <>
      <div className="w-full broder-[#444444] border dark:bg-black py-[30px] px-[22px] dark:text-white grid grid-cols-8 ">
        <div className="col-span-3 flex gap-3">
          <input
            type="checkbox"
            id="submission"
            name="submission"
            value=""
            checked={change || isChecked}
            onChange={(id) => handleChange(id)}
          />
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
            <div className="flex space-y-2">
              <div>
                <span className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-800 ">
                  <span className="text-lg font-medium leading-none text-white">
                    {name}
                  </span>
                </span>
              </div>
              <div className="space-y-2 ">
                <div className=" ml-4 flex flex-row space-x-2">
                  <UserCircleIcon className="h-[20px] w-[18px] text-gray-500 " />
                  <p>{fields.name}</p>
                </div>

                <div className="ml-4 flex flex-row space-x-2">
                  <EnvelopeIcon className="h-[20px] w-[18px] text-gray-500 " />
                  <p className="text-sm">{fields.email}</p>
                </div>
                <div className="ml-4 flex flex-row space-x-2  text-sm ">
                  <ClockIcon className="h-[20px] w-[18px] text-gray-500" />
                  <p>Submitted {getTimeAgo(createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex col-span-3 space-y-2  ">
          <div className="flex flex-col">
            <div className="flex">
              <ChatBubbleBottomCenterIcon className="h-[20px] w-[18px] text-gray-500" />
              <p className="text-black dark:text-gray-300 text-md">Message</p>
            </div>
            <div>
              <div className="flex flex-col">
                <div className="flex items-start">
                  {showMore
                    ? fields?.message || ""
                    : isEmpty(fields?.message)
                    ? ""
                    : `${fields?.message?.substring(0, 30)}...`}
                </div>
                <div>
                  <button
                    className="btn underline"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show less" : "Show more"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {Object.entries(fields)
            .filter(([key, value]: any) => !excludeFields.includes(key))
            .map(([key, value]: any, index, array) => {
              if (showAllFields || index < 2 || array.length === 2) {
                return (
                  <div key={key} className="">
                    <p className="text-black whitespace-nowrap dark:text-gray-300">
                      {key.split(" ").slice(0, 3).join(" ")}
                      {key.split(" ").length > 5 && <br />}
                      {key.split(" ").slice(5).join(" ")}
                    </p>
                    <div className="text-gray-500">
                      <p>
                        {value.split(" ").slice(0, 3).join(" ")}
                        {value.split(" ").length > 5 && <br />}
                        {value.split(" ").slice(5).join(" ")}
                      </p>
                    </div>
                  </div>
                );
              } else if (index === 2 && array.length > 2) {
                return (
                  <div key="show-more" className="">
                    <button
                      className="btn underline"
                      onClick={() => setShowAllFields(true)}
                    >
                      Show more
                    </button>
                  </div>
                );
              }
            })}
          {showAllFields && (
            <div className="">
              <button
                className="btn underline"
                onClick={() => setShowAllFields(false)}
              >
                Show less
              </button>
            </div>
          )}
        </div>

        <div className=" text-end relative">
          <div className="w-full ">
            <span className="inline-flex items-center rounded-full bg-orange-500 px-2 py-0.5 text-xs font-medium text-gray-100">
              New
            </span>
            {isSpam && (
              <p className="absolute right-0 bottom-0 border py-0.5 px-1.5 rounded-full bg-red-500  text-xs font-medium text-gray-100">
                Spam
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
