"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/ui/Input/SimpleInput";
import Header from "@/ui/Header";
import updateTeam from "@/app/fetch/teams/updateTeam";
import Heading from "./Heading";
import CardFooter from "@/ui/CardFooter";
import { kebabCase } from "lodash";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { getSingleTeam } from "@/app/fetch/teams/getSingleTeam";

const TeamUrl = ({ teamSlug }: any) => {
  const [loading, setLoading] = useState<any>(false);
  const router = useRouter();
  const parsedTeam = JSON.parse(teamSlug);
  const [url, setUrl] = useState("");
  const [isTeamExist, setIsTeamExist] = useState(false);

  const handleSlugChange = async () => {
    if (url.length >= 5) {
      setLoading(true);
      const response: any = await updateTeam({
        teamSlug: parsedTeam.slug,
        teamName: kebabCase(url),
        type: "updateSlug",
      });
      if (response.success) {
        showSuccessToast("Your ID updated successfully");
        setLoading(false);
        router.push(`/${kebabCase(url)}/settings`);
        router.refresh();
      }
    } else {
      showErrorToast("Minimum length is 5 characters");
    }
  };

  const onChangeField = async (e: any) => {
    const { value } = e.target;
    setUrl(value);
    if (value.length > 5) {
      const team = await getSingleTeam({ teamSlug: value });
      if (team.success) {
        setIsTeamExist(true);
      } else {
        setIsTeamExist(false);
      }
    }
  };

  return (
    <>
      <div className="p-4 px-6 divide-y divide-gray-300 ">
        <Header title={"Team URL"} />
        <div className="pt-4">
          <Heading
            description={`This is your team’s URL namespace on formzillion. Within it,
              your team can inspect their projects, check out any recent
              activity, or configure settings to their liking.`}
          />
          <div className="flex items-center justify-between my-3">
            <Input
              type="text"
              placeholder={parsedTeam.slug}
              className="border px-3 py-2 w-[20%] dark:bg-black dark:border-gray-800"
              value={`formzillion.com/`}
              disabled
            />
            <Input
              type="text"
              className="border px-3 py-2 dark:bg-black dark:border-gray-800"
              defaultValue={parsedTeam.slug}
              onChange={onChangeField}
              maxLength={36}
            />
          </div>
          {isTeamExist && (
            <p className="text-xs text-red-600">
              Team with this url already exists.
            </p>
          )}
        </div>
      </div>
      <CardFooter
        title={"Please use 36 characters at maximum."}
        btnText={"Save"}
        onClick={handleSlugChange}
        disabled={isTeamExist}
        loading={loading}
      />
    </>
  );
};

export default TeamUrl;
