"use client";
import React, { useState } from "react";
import { AiFillHtml5 } from "react-icons/ai";
import { FaReact, FaVuejs } from "react-icons/fa";
import { TbMicroscope } from "react-icons/tb";

export default function SeeInAction() {
  const [selectedLang, setSelectedLang] = useState("html");
  return (
    <div className="text-white mx-auto max-w-6xl p-2 lg:p-16 ">
      <div className="flex flex-col justify-center items-center w-full text-center space-y-5 text-white mb-10">
        <div className="rounded-full p-4 bg-gradient-to-b from-yellow-400 via-orange-500 to-orange-600">
          <TbMicroscope size={50} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal">
          Experience{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            super power{" "}
          </span>
          forms
        </h1>
        <p className="text-base lg:text-xl leading-normal px-12 sm:max-w-4xl font-light text-gray-300">
          Here&apos;s an example form integrated with Formzillion. After
          submitting the form, you will be directed to our default thank you
          page. Additionally, you will receive an autoresponse email response,
          which should arrive in your inbox within a few seconds.
        </p>
      </div>
      <h3 className="text-center text-2xl text-gray-200 mb-5">
        Go ahead, and give a try!
      </h3>
      <div className="flex justify-center space-x-5 mb-4">
        <AiFillHtml5
          size={50}
          onClick={() => setSelectedLang("html")}
          className={selectedLang == "html" ? "text-gray-200" : "text-gray-500"}
        />
        <FaReact
          size={50}
          onClick={() => setSelectedLang("react")}
          className={
            selectedLang == "react" ? "text-gray-200" : "text-gray-500"
          }
        />
        <FaVuejs
          size={50}
          onClick={() => setSelectedLang("vue")}
          className={selectedLang == "vue" ? "text-gray-200" : "text-gray-500"}
        />
      </div>
      {selectedLang == "html" && (
        <iframe
          src="https://codesandbox.io/embed/formzillion-html-basic-native-example-djje8n?fontsize=14&hidenavigation=1&theme=dark"
          className="w-full h-[600px] rounded-xl scroll-m-1 overflow-scroll max-h-screen scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-md scrollbar-h-[1px] scrollbar-thumb-gray-700"
          title="Formzillion - HTML/Basic/Native Example"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
      )}
      {selectedLang == "react" && (
        <iframe
          src="https://codesandbox.io/embed/green-leaf-usev4d?fontsize=14&hidenavigation=1&theme=dark"
          className="w-full h-[600px] rounded-xl"
          title="green-leaf-usev4d"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
      )}
      {selectedLang == "vue" && (
        <iframe
          src="https://codesandbox.io/embed/formzillion-basic-vue-form-ilixsd?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark"
          className="w-full h-[600px] rounded-xl"
          title="Formzillion - Basic Vue form"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
      )}
    </div>
  );
}
