import React from "react";

export default function HowToConnect() {
  return (
    <div className="mt-40">
      <div className="text-center space-y-4">
        <p className="text-2xl sm:text-3xl font-normal">
          How to create a workflow between Formzillion and Slack
        </p>
        <p>
          Easy Slack integration with your daily use apps on Formzillion,
          enables team collaborate to achieve goal must faster.
        </p>
      </div>

      <div className="mt-10 mx-auto max-w-4xl text-gray-300">
        <p className="text-lg font-medium">Steps to connect with slack</p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <p className="p-4 bg-gray-900/50 rounded">
            Login to Formzillion app, navigate to apps and connect your slack
          </p>
          <p className="p-4 bg-gray-900/50 rounded">
            After successfully connecting Formzillion to your Slack workspace,
            select the desired channel to post your form submissions.
          </p>
          <p className="p-4 bg-gray-900/50 rounded">
            Once slack is connected, all new submissions to your form will be
            posted to your Slack channel automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
