"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { Card } from "@/ui/Card/SCard";
import React, { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Button } from "@/ui/Buttons/SButton";
import { capitalize, isEmpty } from "lodash";
import Link from "next/link";
import updateTeam from "@/app/fetch/teams/updateTeam";
import { useRouter } from "next/navigation";
import { Dialog } from "@/ui/Dialog";
import LoadingButton from "@/ui/Buttons";
import CreateTeamDialog from "@/app/(portal)/shared/CreateTeamDialog";
import Image from "next/image";

function getTeamRoles(teams: any) {
  const roles: any = [];

  teams.memberships.forEach((membership: any) => {
    const team = teams.teams.find((team: any) => team.id === membership.teamId);
    if (team) {
      roles.push({
        teamId: team.id,
        name: team.name,
        type: team.type,
        slug: team.slug,
        role: membership.role,
        avatar: team.avatar,
      });
    }
  });

  return roles;
}

const TeamsList = ({ teams }: any) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<any>(false);
  const parsedTeams = JSON.parse(teams);
  teams = getTeamRoles(parsedTeams);

  const handleLeave = ({ name, slug }: any) => {
    const response: any = updateTeam({
      teamName: name,
      teamSlug: slug,
      type: "leaveTeam",
    });
    if (response) {
      router.refresh();
    }
  };

  return (
    <>
      {!isEmpty(teams) && (
        <div className="space-y-5">
          <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black dark:divide-gray-800">
            <div className="p-4 px-6 divide-y divide-gray-100 dark:divide-black">
              <div className="flex justify-between items-center">
                <div className="font-bold text-lg py-4">Teams</div>
                <LoadingButton
                  onClick={() => setShowModal(true)}
                  className="rounded-none pt-1 pb-1"
                >
                  Create a Team
                </LoadingButton>
                <Dialog open={showModal} onOpenChange={setShowModal}>
                  <CreateTeamDialog setShowNewTeamDialog={setShowModal} />
                </Dialog>
              </div>
              <div>
                {teams?.map((team: any, idx: number) => (
                  <div key={idx}>
                    {team.type !== "personal" && (
                      <div key={idx}>
                        <Card key={team?.id} className="mt-2 w-full">
                          <div className="text-sm flex justify-between items-center dark:text-white p-4">
                            <div className="flex flex-row items-center">
                              <div>
                                {!isEmpty(team.avatar) ? (
                                  <Image
                                    src={team.avatar}
                                    alt="err"
                                    className="mr-4 h-8 w-8 rounded-full"
                                    height={20}
                                    width={20}
                                  />
                                ) : (
                                  <Avatar className="mr-4 h-8 w-8">
                                    <AvatarImage
                                      src={`https://avatar.vercel.sh/${team.slug}.png`}
                                      alt={team.name}
                                    />
                                    <AvatarFallback>SC</AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                              <div>
                                <h1 className="capitalize">{team.name}</h1>
                                <h1 className="font-light text-xs text-gray-600 dark:text-gray-500">
                                  {capitalize(team.role)}
                                </h1>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div
                                className={
                                  team.role === "OWNER"
                                    ? `space-x-2 sm:mr-[2.2rem]`
                                    : `space-x-2`
                                }
                              >
                                <Link
                                  className="border dark:border-gray-600 rounded p-2"
                                  href={`${process.env.NEXT_PUBLIC_APP_URL}/${team.slug}`}
                                >
                                  View
                                </Link>
                                <Link
                                  className="border dark:border-gray-600 rounded p-2"
                                  href={`${process.env.NEXT_PUBLIC_APP_URL}/${team.slug}/team/settings`}
                                >
                                  Manage
                                </Link>
                              </div>
                              {team.role !== "OWNER" && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button className="px-2 py-1 bg-transparent dark:text-white text-black hover:bg-transparent hover:text-black">
                                      <span className="sr-only">Actions</span>
                                      <EllipsisVerticalIcon className="h-5 w-5" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onSelect={() =>
                                        handleLeave({
                                          name: team.name,
                                          slug: team.teamId,
                                        })
                                      }
                                      className="text-red-600"
                                    >
                                      Leave
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamsList;
