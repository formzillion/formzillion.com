"use client";
import Image from "next/image";
import { useSupabase } from "@/components/SupbaseProvider";
import { get } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/ui/Buttons";

export default function TeamNotFound() {
  const { session } = useSupabase();
  const router = useRouter();
  const userEmail: string = get(session, "user.email", "");
  const [loading, setLoading] = useState(false);

  const handleOnclick = async () => {
    setLoading(true);
    const response = await fetch("/api/teams/getSingleTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail }),
    });
    const teams = await response.json();
    setLoading(false);
    const personalAccount = teams?.data.find(
      (team: any) => team.type === "personal"
    );
    const teamSlug = get(personalAccount, "slug", "");
    router.push(`/${teamSlug}`);
  };

  return (
    <>
      <div className="flex mt-10 justify-center">
        <Image
          src={"/team_not_found.png"}
          alt="Empty Form logo"
          width={300}
          height={300}
        />
      </div>
      <h1 className="text-center font-light text-2xl">
        {`The team or account you're searching for is not available.`}
        <br />
        Please proceed to the account page.
      </h1>
      <div className="flex justify-center mt-4">
        <Button loading={loading} onClick={() => handleOnclick()}>
          Back to account
        </Button>
      </div>
    </>
  );
}
