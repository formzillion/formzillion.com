"use client";
import updateTeam from "@/app/fetch/teams/updateTeam";
import Button from "@/ui/Buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/Card/SCard";
import { Input } from "@/ui/Input/SimpleInput";
import React, { useState } from "react";

const TeamName = ({ teamSlug }: any) => {
  const parsedTeam = JSON.parse(teamSlug);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<any>(false);

  const handleNameChange = () => {
    setLoading(true);
    const response: any = updateTeam({
      teamName: name,
      teamSlug: parsedTeam.slug,
      type: "updateName",
    });
    if (response) {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Team Name</CardTitle>
          <CardDescription className="text-gray-600">
            This is your teams visible name within Formzillion. such as the name
            of your client, company or department.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              className="border px-3 py-2 w-[30%] dark:bg-black dark:border-gray-800"
              defaultValue={parsedTeam.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            Please use 32 characters at maximum.
          </p>
          <Button
            loading={loading}
            onClick={() => {
              handleNameChange();
            }}
            className="flex justify-end rounded-none"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TeamName;
