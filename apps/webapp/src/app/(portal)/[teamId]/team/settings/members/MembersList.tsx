"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { Card } from "@/ui/Card/SCard";
import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Button } from "@/ui/Buttons/SButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import updateTeam from "@/app/fetch/teams/updateTeam";
import { showErrorToast } from "@/ui/Toast/Toast";
import { isEmpty } from "lodash";
import Header from "@/ui/Header";
import { useRouter } from "next/navigation";

const MembersList = ({ teams, currentUserEmail }: any) => {
  const router = useRouter();
  const parsedMembers = JSON.parse(teams);
  const parsedCurrentEmail = JSON.parse(currentUserEmail);
  let currentUserDetails: any;
  parsedMembers.forEach((element: any) => {
    if (element.user.email === parsedCurrentEmail) {
      currentUserDetails = element;
    }
  });

  const [open, setIsOpen] = React.useState(false);
  const handleLeave = (
    userId: any,
    teamSlug: any,
    role: string,
    userEmail?: string
  ) => {
    if (userEmail === parsedCurrentEmail) {
      showErrorToast("You can't remove yourself");
    } else if (currentUserDetails?.role === "MEMBER") {
      showErrorToast("Please get Access");
    } else {
      const res: any = updateTeam({
        teamName: userId,
        teamSlug,
        type: "removeMember",
      });
      if (res) {
        router.refresh();
      }
    }
  };
  const handleRoleChange = (id: any, teamId: any) => {
    console.log(id, teamId);
  };

  return (
    <>
      {!isEmpty(parsedMembers) && (
        <div className="space-y-5">
          <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
            <div className="p-4 px-6 divide-y divide-gray-300">
              <Header title={"Team Members"} />
              <div>
                {parsedMembers?.map((team: any, idx: number) => (
                  <div key={idx}>
                    <Card key={team?.user.id} className="mt-2 w-full">
                      <div className="text-sm flex justify-between items-center dark:text-white p-4">
                        <div className="flex flex-row items-center">
                          <div>
                            <Avatar className="mr-4 h-8 w-8">
                              <AvatarImage
                                src={`https://avatar.vercel.sh/${team?.user.email}.png`}
                                alt={team.id}
                              />
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <h1 className="capitalize">
                              {team.user.email.split("@")[0]}
                            </h1>
                            <h1 className="font-light text-gray-700 dark:text-gray-500">
                              {team.user.email}
                            </h1>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <h1
                            className={
                              team.role === "OWNER"
                                ? "text-xs font-light mr-12"
                                : "text-xs font-light mr-2"
                            }
                          >
                            {team.role}
                          </h1>
                          {team.role !== "OWNER" && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button className="px-2 py-1">
                                  <span className="sr-only">Actions</span>
                                  <EllipsisVerticalIcon className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() => setIsOpen(true)}
                                >
                                  Change Role
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onSelect={() =>
                                    handleLeave(
                                      team.userId,
                                      team.team.slug,
                                      team.role,
                                      team.user.email
                                    )
                                  }
                                  className="text-red-600"
                                >
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                          <Dialog open={open} onOpenChange={setIsOpen}>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Change Role?</DialogTitle>
                                <DialogDescription>
                                  You should be admin to Change role.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2">
                                <label htmlFor="plan">Select a Role</label>
                                <Select>
                                  <SelectTrigger className="rounded-none">
                                    <SelectValue
                                      className="text-gray-600"
                                      placeholder="Select a plan"
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem
                                      className={"bg-black"}
                                      value="free"
                                      onSelect={() => handleRoleChange}
                                    >
                                      <span className="font-medium">Free</span>{" "}
                                      -{" "}
                                      <span className="text-muted-foreground">
                                        Trial for two weeks
                                      </span>
                                    </SelectItem>
                                    <SelectItem
                                      className={"bg-black"}
                                      value="pro"
                                    >
                                      <span className="font-medium">Pro</span> -{" "}
                                      <span className="text-muted-foreground">
                                        $9/month per user
                                      </span>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="secondary"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Confirm
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </Card>
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

export default MembersList;
