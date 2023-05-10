"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/SupbaseProvider";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { Button } from "@/ui/Buttons/SButton";
import Button2 from "@/ui/Buttons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/ui/Command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/Dialog";
//import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import { Input } from "@/ui/Input/SimpleInput";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isEmpty, startCase } from "lodash";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { UserCircleIcon } from "@heroicons/react/24/outline";

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
  const [loading, setLoading] = useState(false);
  const { session } = useSupabase();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const parsedTeams = JSON.parse(teams || "[]");

  //Dialog related States
  const [teamValues, setTeamValues] = useState<any>({
    name: "",
    emailsToInvite: [""],
  });
  const personalTeams = parsedTeams.filter((team: any) => team.type !== "personal");

  const filteredTeams = personalTeams?.map((team: any) => {
    // if (team.type === "personal") {
    return { label: team.name, value: team.slug, planName: team.planName };
    // }
  });
  const loggedInUser = parsedTeams?.map((team: any) => {
    if (team.type === "personal") {
      return { label: team.name, value: team.slug, planName: team.planName };
    }
  });

  const groups =
    filteredTeams?.length > 0
      ? [
          // {
          //   label: "Personal Account",
          //   teams: loggedInUser,
          // },
          {
            label: "Teams",
            teams: filteredTeams,
          },
        ]
      : [];

  const [selectedTeam, setSelectedTeam] = useState<any>(() => {
    return {
      label: teamSlug,
      value: teamSlug,
      planName: "",
    };
  });

  const handleSelectTeam = (teamId: any) => {
    router.push(`/${teamId}`);
  };

  const onClickCreateTeam = async () => {
    setLoading(true);
    const response: any = await fetch("/api/teams/create", {
      method: "POST",
      body: JSON.stringify(teamValues),
    });
    setShowNewTeamDialog(false);
    const responseData = await response.json();

    if (response.status === 201) {
      showSuccessToast("Created Team Successfully");
      setLoading(false);
      const teamSlug = responseData.data.slug;
      router.push(`/${teamSlug}`);
    } else {
      setLoading(false);
      showErrorToast(responseData.message);
    }
  };

  const onChangeField = (e: any) => {
    const { name, value } = e.target;
    setTeamValues({
      ...teamValues,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center max-w-[200px]">
      <div className="flex items-center dark:text-white text-gray-800">
        {!isEmpty(selectedTeam.teamSlug) ? (
          <UserCircleIcon className="mr-2 h-5 w-5" />
        ) : (
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
              alt={selectedTeam.label}
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        )}
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/${selectedTeam.value}`}
          className="flex items-center"
        >
          {selectedTeam?.label?.length >= 10 ? (
            <div className="w-[150px] truncate text-base">
              {startCase(selectedTeam.label)}
            </div>
          ) : (
            <div className="text-base">{startCase(selectedTeam.label)}</div>
          )}
          {!isEmpty(selectedTeam.planName) && (
            <span className="bg-green-300 text-gray-600 px-2 text-xs rounded-full ml-2 flex items-center">
              {selectedTeam.planName}
            </span>
          )}
        </Link>
      </div>
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
                {groups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {group.teams.map((team: any) => (
                      <CommandItem
                        key={team.value}
                        onSelect={() => {
                          setSelectedTeam(team);
                          handleSelectTeam(team.value);
                          setOpen(false);
                        }}
                        className="text-sm cursor-pointer"
                      >
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${team?.value}.png`}
                            alt={team?.label}
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {team.label}{" "}
                        <span className="bg-green-300 text-gray-600 px-2 text-xs rounded-full ml-2">
                          {team.planName}
                        </span>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create team</DialogTitle>
            <DialogDescription className="text-gray-600">
              Add a new team to manage products and customers.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <label htmlFor="teamName">Team name</label>
                <Input
                  className="text-gray-600"
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="teamName"
                  value={teamValues?.name}
                  placeholder="Team name"
                  onChange={onChangeField}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="emails">Emails</label>
                <Input
                  type="email"
                  name="emailsToInvite"
                  id="emails"
                  autoComplete="emails"
                  value={teamValues?.emailsToInvite}
                  placeholder="Enter emails in comma separated format."
                  onChange={onChangeField}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="plan">Subscription plan</label>
                <Select>
                  <SelectTrigger className="rounded-none">
                    <SelectValue
                      className="text-gray-600"
                      placeholder="Select a plan"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className={"dark:bg-black"} value="free">
                      <span className="font-medium">Free</span> -{" "}
                      <span className="text-muted-foreground">
                        Trial for two weeks
                      </span>
                    </SelectItem>
                    <SelectItem className={"dark:bg-black"} value="pro">
                      <span className="font-medium">Pro</span> -{" "}
                      <span className="text-muted-foreground">
                        $9/month per user
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button2
              loading={loading}
              className="bg-orange-600 text-white rounded-none"
              onClick={onClickCreateTeam}
              type="submit"
            >
              Create
            </Button2>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
