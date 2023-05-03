import { TicketIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function SeeItInAction() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto px-8 py-12" style={{ maxWidth: "1300px" }}>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl text-gray-900 font-semibold">
            See it in action
          </h2>
        </div>
        <div className="bg-white shadow rounded p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="text-lg p-4">
              <div className="flex items-start select-none">
                <div className="text-green-500">
                  <TicketIcon className="h-6 w-6" />
                </div>
                <div className="pl-3">No storage or databases to handle</div>
              </div>
              <div className="mt-4"></div>
              <div className="flex items-start select-none">
                <div className="text-green-500">
                  <TicketIcon className="h-6 w-6" />
                </div>
                <div className="pl-3">No frameworks or APIs to learn</div>
              </div>
              <div className="mt-4"></div>
              <div className="flex items-start select-none">
                <div className="text-green-500">
                  <TicketIcon className="h-6 w-6" />
                </div>
                <div className="pl-3">No backend servers to manage</div>
              </div>
              <div className="mt-4"></div>
              <div>Perfect for static sites, blogs and business websites.</div>
              <div className="mt-8"></div>
              <div>
                <a href="https://app.formzillion.io/sign-up">
                  <button
                    type="button"
                    className="font-semibold cursor-pointer focus:outline-none select-none text-orange-500 hover:text-indigo-700"
                  >
                    <span className="inline-block sm:hidden">Get started.</span>
                    <span className="hidden sm:inline-block">
                      Start collecting data in a matter of minutes.
                    </span>
                  </button>
                </a>
              </div>
            </div>
            <div className="p-4">
              <div className="bg-white shadow rounded p-6">
                <form action="" target="_blank">
                  <div>
                    <label className="block text-gray-700 text-sm leading-5 font-semibold select-none">
                      Email
                      <span
                        className="relative text-red-500"
                        style={{ margin: "-0.1em 0 0 0.2em" }}
                      >
                        *
                      </span>
                    </label>
                    <div className="mt-2"></div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="name@work-email.com"
                        required={true}
                        className="block w-full rounded-md shadow-sm px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 transition duration-150 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="mt-4"></div>
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center font-semibold rounded-md focus:outline-none transition duration-150 ease-in-out select-none border border-gray-300 text-gray-600 hover:text-gray-500 bg-white shadow-sm focus:ring focus:ring-indigo-100 py-2 px-4 w-full"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
