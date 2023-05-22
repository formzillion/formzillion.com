import {
  EnvelopeIcon,
  ListBulletIcon,
  ShareIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import React from "react";

export default function Features() {
  const fertures = [
    {
      title: "Data validated, spam blocked.",
      subtitle:
        "Your data undergoes server-side validation, while our advanced machine learning algorithms work tirelessly to shield you from spam.",
      icon: <ShieldCheckIcon className="w-8 text-green-500" />,
    },
    {
      title: "Email notifications and automatic responses are dispatched.",
      subtitle:
        "Responsiveness through automated email notifications and auto-responses",
      icon: <EnvelopeIcon className="w-8 text-yellow-500" />,
    },
    {
      title: "Submissions are saved to your Formzillion account.",
      subtitle: "View submissions and export them as CSV or JSON files.",
      icon: <ListBulletIcon className="w-8" />,
    },
    {
      title: "Third party integrations come into action.",
      subtitle:
        "We eliminate the need for Zapier like application by utilizing our direct integrations to effortlessly transport your data to its intended destination.",
      icon: <ShareIcon className="w-8 text-blue-500" />,
    },
  ];
  return (
    <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl mt-4 mx-auto py-8 lg:py-1">
      <div className="mb-5 text-center">
        <h1 className="text-4xl mb-2 font-normal">
          As soon as you click the submit button...
        </h1>
        <p className="text-gray-400">
          {
            "Formzillion takes care of all the time-saving automation tasks we've set it up for, providing instant execution."
          }
        </p>
      </div>
      <div className=" lg:col-span-3 mt-5">
        <div className=" gap-5 grid grid-cols-2">
          {fertures.map((ferture, idx) => (
            <div
              key={idx}
              className="p-2 border rounded border-gray-900 space-y-4 hover-border"
            >
              <div className="bg-black p-4 rounded relative z-10 h-full space-y-5">
                <div className=" space-y-5">
                  {ferture.icon}
                  <div>
                    <h2 className="text-lg my-1 font-semibold ">
                      {ferture.title}
                    </h2>
                    <p className="text-gray-400 text-sm">{ferture.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
