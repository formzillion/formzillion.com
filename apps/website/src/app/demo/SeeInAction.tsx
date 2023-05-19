import React from "react";

export default function SeeInAction() {
  return (
    <div className="text-white mx-auto max-w-6xl p-2 lg:p-16 ">
      <div className="flex flex-col justify-center items-center w-full text-center space-y-5 text-white mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal">
          Experience{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            super power{" "}
          </span>
          forms
        </h1>
        <p className="text-base lg:text-xl leading-normal px-12 sm:max-w-3xl font-light text-gray-300">
          Here's an example form integrated with Formzillion. After submitting
          the form, you will be directed to our default thank you page.
          Additionally, you will receive an autoresponse email response, which
          should arrive in your inbox within a few seconds.
        </p>
      </div>
      <iframe
        src="https://codesandbox.io/embed/formzillion-html-basic-native-example-djje8n?fontsize=14&hidenavigation=1&theme=dark"
        className="w-full h-[550px] rounded-xl"
        title="Formzillion - HTML/Basic/Native Example"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
}
