"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal, { ModalTitle } from "@/components/Modal";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function CreateTeamModal({ isOpen, closeModal }: any) {
  const router = useRouter();
  const [selected, setSelected] = useState("trial");
  const [teamValues, setTeamValues] = useState<any>({
    name: "",
    emailsToInvite: [""],
  });

  const onClickCreateTeam = async () => {
    const response: any = await fetch("/api/teams/create", {
      method: "POST",
      body: JSON.stringify(teamValues),
    });
    if (response) {
      const teamId = response?.data?.id;
      closeModal();
      router.push(`/teams/${teamId}`);
      router.refresh();
    }
  };

  const onChangeField = (e: any) => {
    const { name, value } = e.target;
    setTeamValues({
      ...teamValues,
      [name]: value,
    });
  };

  const handleSelect = (value: any) => {
    setSelected(value);
  };

  return (
    <Modal isOpen={isOpen} toggle={closeModal}>
      <ModalTitle title="Create Team" toggle={closeModal} />
      <div className="space-y-6 p-4 sm:space-y-5">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="teamName"
            className="block text-sm font-medium text-gray-200 sm:mt-px sm:pt-2"
          >
            Team name
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="teamName"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              value={teamValues?.name}
              onChange={onChangeField}
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="emails"
            className="block text-sm font-medium text-gray-200 sm:mt-px sm:pt-2"
          >
            Emails
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="email"
              name="emailsToInvite"
              id="emails"
              autoComplete="emails"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              value={teamValues?.emailsToInvite}
              onChange={onChangeField}
            />
          </div>
        </div>

        <div>
          <div>
            <ul className="flex gap-4  justify-between">
              <li
                className={`flex items-center justify-between w-[50%] p-2 cursor-pointer  ${
                  selected === "trial"
                    ? "border-2 border-orange-600 rounded-md p-2"
                    : ""
                }`}
                onClick={() => handleSelect("trial")}
              >
                <div>
                  <div className="text-sm font-medium text-gray-200">
                    Pro Trial
                  </div>
                  <div className="text-sm text-gray-500">Free for 2 weeks</div>
                </div>
                <div>
                  <div>
                    <CheckCircleIcon
                      className={`w-6 mx-2 ${
                        selected === "trial"
                          ? "text-orange-600"
                          : "text-gray-800"
                      }`}
                    />
                  </div>
                </div>
              </li>
              <li
                className={`flex items-center justify-between w-[50%] p-2 cursor-pointer  ${
                  selected === "pro"
                    ? "border-2 border-orange-600 rounded-md p-2"
                    : ""
                }`}
                onClick={() => handleSelect("pro")}
              >
                <div>
                  <div className="text-sm font-medium text-gray-200">Pro</div>

                  <div className="text-sm text-gray-500">Get started now</div>
                </div>
                <div>
                  <div>
                    <CheckCircleIcon
                      className={`w-6 mx-2 ${
                        selected === "pro" ? "text-orange-600" : "text-gray-800"
                      }`}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>
              Continuing will start{" "}
              {selected === "trial"
                ? "a 14-day Pro plan trial."
                : "a monthly Pro plan subscription."}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm  text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          onClick={onClickCreateTeam}
        >
          Create Team
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border bg-gray-300 border-gray-300 shadow-sm px-4 py-2  text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
