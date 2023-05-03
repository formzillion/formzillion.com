import React from "react";

export default function CtaSection() {
  return (
    <>
      <div className="bg-gray-50">
        <div className="mx-auto px-8 py-12" style={{ maxWidth: "1300px" }}>
          <div className="text-white bg-gradient-to-r from-orange-500 to-orange-300 rounded-md shadow">
            <div className="max-w-2xl mx-auto text-center py-8 px-4">
              <div className="text-2xl leading-9 font-semibold">
                <span className="block">
                  Start collecting submissions with Formzillion
                </span>
              </div>
              <div className="mt-8"></div>
              <p className="text-lg leading-6">
                Formzillion is a reliable backend for your forms.
              </p>
              <div className="mt-2"></div>
              <p className="text-lg leading-6">
                Keep full control over the look and feel of your forms.
              </p>
              <div className="mt-2"></div>
              <p className="text-lg leading-6">
                Let Formzillion take care of the rest.
              </p>
              <div className="mt-8"></div>
              <div className="text-xl leading-8">
                <a href="https://app.formzillion.io/sign-up">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center font-semibold rounded-md focus:outline-none transition duration-150 ease-in-out select-none border border-gray-300 text-gray-600 hover:text-gray-500 bg-white shadow-sm focus:ring focus:ring-indigo-100 py-3 px-6"
                  >
                    Try it free today
                  </button>
                </a>
              </div>
              <div className="mt-4"></div>
              <div>No credit card required</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
