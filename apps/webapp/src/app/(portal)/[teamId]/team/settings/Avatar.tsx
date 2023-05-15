"use client";

import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { get, isEmpty } from "lodash";
import Image from "next/image";
import Resizer from "react-image-file-resizer";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import updateTeam from "@/app/fetch/teams/updateTeam";
import Header from "@/ui/Header";
import Heading from "./Heading";
import CardFooter from "@/ui/CardFooter";
import { useRouter } from "next/navigation";

const Avatar = ({ teamSlug }: any) => {
  const router = useRouter();
  let parsedData;
  if (teamSlug) {
    parsedData = JSON.parse(teamSlug || "");
  }
  const avatar = get(parsedData, "avatar", "");
  teamSlug = get(parsedData, "slug", "");
  const teamName = get(parsedData, "name", "");
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState<any>();

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    Resizer.imageFileResizer(
      file,
      300, // maximum width
      500, // maximum height
      "JPEG", // output format
      100, // quality
      0, // rotation
      (uri) => {
        setBase64Image(uri);
      },
      "base64" // encoding type
    );
  };

  const onSubmit = async () => {
    setLoading(true);
    const res = await updateTeam({
      teamName,
      teamSlug,
      avatar: base64Image,
      type: "changeAvatar",
    });
    if (res.success === true) {
      setLoading(false);
      router.refresh();
      showSuccessToast("Updated profile successfully");
    } else {
      setLoading(false);
      showErrorToast("Failed to update profile");
    }
  };
  return (
    <>
      <div className="p-4 px-6 divide-y divide-gray-300 dark:divide-gray-700">
        <Header title={"Your Avatar"} />
        <div className="pt-4 flex justify-between items-center">
          <Heading
            description={`This is your avatar. Click on change to upload a custom one from your files.`}
          />
          <div className="mt-1 items-center justify-center">
            {isEmpty(avatar) && isEmpty(base64Image) ? (
              <>
                <UserCircleIcon className="h-20 w-20" />
              </>
            ) : (
              <Image
                src={!isEmpty(base64Image) ? base64Image : avatar}
                alt="err"
                className="h-20 w-20 border border-gray-200 dark:border-gray-800 object-contain rounded-full"
                height={20}
                width={20}
              />
            )}
            <div className="ml-1 mt-2 flex">
              <div className="relative flex cursor-pointer items-center rounded bg-white border border-gray-300 py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 hover:bg-gray-50">
                <label
                  htmlFor="user-photo"
                  className="pointer-events-none  relative text-sm font-medium text-gray-900"
                >
                  <span>Change</span>
                  <span className="sr-only mt-2"> User photo</span>
                </label>
                <input
                  type="file"
                  id="user-photo"
                  accept=".png, .jpg, .jpeg, .jfif"
                  name="user-photo"
                  className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0 border"
                  onChange={handleImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardFooter
        title={
          "While an avatar is not mandatory, it is highly advisable to have one."
        }
        btnText={"Save"}
        onClick={onSubmit}
        loading={loading}
      />
    </>
  );
};

export default Avatar;
