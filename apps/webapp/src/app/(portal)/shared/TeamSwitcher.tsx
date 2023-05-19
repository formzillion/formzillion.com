"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { Button } from "@/ui/Buttons/SButton";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/ui/Command";
import { Dialog, DialogTrigger } from "@/ui/Dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";

import { usePathname } from "next/navigation";
import { isEmpty } from "lodash";
import Image from "next/image";
import TeamName from "./TeamName";
import CreateTeamDialog from "./CreateTeamDialog";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

interface TeamSwitcherProps {
  className?: string;
  teams?: string;
}

export default function TeamSwitcher({ className, teams }: TeamSwitcherProps) {
  const pathname = usePathname();
  const teamSlug = pathname?.split("/")[1];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const parsedTeams = JSON.parse(teams || "[]");

  //Dialog related States

  const defaultTeams = parsedTeams.filter(
    (team: any) => team.type !== "personal"
  );
  const personalTeam = parsedTeams.filter(
    (team: any) => team.type === "personal"
  );
  const filteredTeams = defaultTeams?.map((team: any) => {
    return {
      label: team.name,
      value: team.slug,
      planName: team.planName,
      avatar: team.avatar,
      type: "default",
    };
  });
  const loggedInUser = personalTeam?.map((team: any) => {
    if (team.type === "personal") {
      return {
        label: team.name,
        value: team.slug,
        planName: team.planName,
        avatar: team.avatar,
        type: "personal",
      };
    }
  });

  const groups: any =
    filteredTeams?.length > 0 || loggedInUser?.length > 0
      ? [
          !isEmpty(loggedInUser) && {
            label: "Personal Account",
            teams: loggedInUser,
          },
          !isEmpty(filteredTeams) && {
            label: "Teams",
            teams: filteredTeams,
          },
        ]
      : [];

  let teamData: any;
  if (typeof window !== "undefined") {
    const team: any = window.sessionStorage.getItem("teamData");
    teamData = JSON.parse(team);
  }

  const [selectedTeam, setSelectedTeam] = useState<any>(() => {
    return {
      label: teamData?.label || teamSlug,
      value: teamSlug,
      planName: teamData?.planName || "",
      avatar: teamData?.avatar || "",
    };
  });

  const handleSelectTeam = (teamId: any) => {
    router.push(`/${teamId}`);
  };

  return (
    <div className="flex items-center max-w-[200px]">
      <TeamName selectedTeam={selectedTeam} />
      <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a team"
              className={cn("dark:hover:bg-gray-900 w-1 h-8 ml-2", className)}
            >
              <ChevronUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 dark:border-gray-700">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search team..." />
                <CommandEmpty>No team found.</CommandEmpty>
                {groups?.map((group: any, index: number) => (
                  <CommandGroup key={index} heading={group.label}>
                    {group?.teams?.map((team: any, idx: number) => (
                      <CommandItem
                        key={idx}
                        onSelect={() => {
                          setSelectedTeam(team);
                          handleSelectTeam(team.value);
                          setOpen(false);
                          sessionStorage.setItem(
                            "teamData",
                            JSON.stringify(team)
                          );
                        }}
                        className="text-sm cursor-pointer"
                      >
                        {!isEmpty(team.avatar) ? (
                          <Image
                            src={team.avatar}
                            alt="err"
                            className="mr-2 h-5 w-5 rounded-full"
                            height={20}
                            width={20}
                          />
                        ) : (
                          <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${team.value}.png`}
                              alt={team.label}
                            />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex items-center justify-between w-[70%]">
                          <p className="truncate">{team.label} </p>
                          <span className="bg-green-300 text-gray-600 px-2 text-xs rounded-full">
                            {team.planName}
                          </span>
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedTeam.value === team.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      className="cursor-pointer"
                      onSelect={() => {
                        setOpen(false);
                        setShowNewTeamDialog(true);
                      }}
                    >
                      <PlusCircleIcon className="mr-2 h-5 w-5" />
                      Create Team
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <CreateTeamDialog setShowNewTeamDialog={setShowNewTeamDialog} />
      </Dialog>
    </div>
  );
}
