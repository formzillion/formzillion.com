import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import * as Popover from "@radix-ui/react-popover";
import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import CreateTeamModal from "../app/(portal)/[teamId]/CreateTeamModel";

export default function Popper() {
  const [teams, setTeams] = useState<any>([]);
  const [showModal, setShowModal] = useState<any>(false);

  useEffect(() => {
    async function getTeams() {
      await fetch("/api/teams/list").then((res) =>
        res.json().then((res) => setTeams(res.data))
      );
    }
    getTeams();
  }, []);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="inline-flex items-center justify-center text-gray-400 focus:shadow-black cursor-default outline-none"
          aria-label="Popper"
        >
          <ChevronUpDownIcon className="h-6 w-6" />
        </button>
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[260px] flex bg-gray-700 text-gray-200 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="space-y-6 ">
            {teams?.map((team: any) => (
              <div
                key={team.id}
                className="flex flex-row items-center space-x-2"
              >
                <img
                  src={
                    "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985128.jpg&fm=jpg"
                  }
                  alt="logo"
                  className="w-8 h-8 rounded-full"
                />
                <span>{team.name}</span>
              </div>
            ))}
            <div
              className="flex w-full cursor-pointer items-center text-gray-200"
              onClick={() => setShowModal(true)}
            >
              <PlusCircleIcon className="w-8 mr-2 text-blue-600"/>
              Create Team
            </div>
            {showModal && (
              <CreateTeamModal closeModal={() => setShowModal(false)} />
            )}
          </div>
          <Popover.Close />
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
