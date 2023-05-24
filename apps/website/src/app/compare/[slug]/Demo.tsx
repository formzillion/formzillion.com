"use client";
import React, { useState } from "react";
import { AiFillHtml5 } from "react-icons/ai";
import { FaReact, FaVuejs } from "react-icons/fa";

export default function Demo() {
  const [selectedLang, setSelectedLang] = useState("html");
  return (
    <div className="mx-auto max-w-6xl p-2 lg:p-16 ">
      <h3 className="text-center text-4xl text-gray-200 mb-5">
        Go ahead, and give Formzillion a try!
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
