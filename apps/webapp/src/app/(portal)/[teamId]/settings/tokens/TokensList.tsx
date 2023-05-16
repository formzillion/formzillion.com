"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { Card } from "@/ui/Card/SCard";
import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Button } from "@/ui/Buttons/SButton";

import { isEmpty } from "lodash";
import Header from "@/ui/Header";

const TokensList = () => {
  const handleLeave = () => {};

  const parsedTokens = [
    {
      user: {
        id: "1",
        name: "Website, Login with GitHub",
        expiry: "Never expires",
      },
      createdAt: "2 Days ago",
    },
  ];

  return (
    <>
      {!isEmpty(parsedTokens) && (
        <div className="space-y-5">
          <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
            <div className="p-4 px-6 divide-y divide-gray-300">
              <Header title={"Tokens"} />
              <div>
                {parsedTokens?.map((team: any, idx: number) => (
                  <div key={idx}>
                    <Card key={team?.user.id} className="mt-2 w-full">
                      <div className="text-sm flex justify-between items-center dark:text-white p-4">
                        <div className="flex flex-row items-center">
                          <div>
                            <Avatar className="mr-4 h-8 w-8">
                              <AvatarImage
                                src={`https://avatar.vercel.sh/${team?.user.expiry}.png`}
                                alt={team.id}
                              />
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <h1 className="capitalize">{team.user.name}</h1>
                            <h1 className="font-light dark:text-gray-500">{team.user.expiry}</h1>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <h1 className="text-xs font-light mr-2">{team.createdAt}</h1>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button className="px-2 py-1 bg-transparent dark:text-white text-black hover:bg-transparent hover:text-black">
                                <span className="sr-only">Actions</span>
                                <EllipsisVerticalIcon className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onSelect={() => handleLeave()}
                                className="text-red-600"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

export default TokensList;
