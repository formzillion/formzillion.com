"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/Card/SCard";
import updateTeam from "@/app/fetch/teams/updateTeam";
import Button from "@/ui/Buttons";
import { Input } from "@/ui/Input/SimpleInput";
import { useRouter } from "next/navigation";

const TeamUrl = ({ teamSlug }: any) => {
  const [loading, setLoading] = useState<any>(false);
  const router = useRouter();
  const parsedTeam = JSON.parse(teamSlug);
  const [url, setUrl] = useState("");

  const handleSlugChange = () => {
    setLoading(true);
    const response: any = updateTeam({
      teamSlug: parsedTeam.slug,
      teamName: url,
      type: "updateSlug",
    });
    if (response) {
      setLoading(false);
    }
    router.push(`/${url}/settings`);
  };

  return (
    <div className="flex-1 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Team URL</CardTitle>
          <CardDescription className="text-gray-600">
            {`This is your team’s URL namespace on formzillion. Within it,
          your team can inspect their projects, check out any recent
          activity, or configure settings to their liking.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Input
              type="text"
              placeholder={parsedTeam.slug}
              className="border px-3 py-2 w-[15%] dark:bg-black dark:border-gray-800"
              value={`formzillion.com/`}
              onChange={(e) => setUrl(e.target.value)}
              disabled
            />
            <Input
              type="text"
              className="border px-3 py-2 w-[30%] dark:bg-black dark:border-gray-800"
              defaultValue={parsedTeam.slug}
              onChange={(e) => setUrl(e.target.value)}
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
              handleSlugChange();
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

export default TeamUrl;
