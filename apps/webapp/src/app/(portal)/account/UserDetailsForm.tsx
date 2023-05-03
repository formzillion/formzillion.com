"use client";
import { useForm } from "react-hook-form";
import {
  BriefcaseIcon,
  EnvelopeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import { get, isEmpty } from "lodash";

import PhAvatar from "@/ui/Avatar/PhAvatar";
import { EmailInput, Input, Label } from "@/ui/fields";
import { logger } from "@supabase/auth-helpers-nextjs";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import Button from "@/ui/Buttons";
import Image from "next/image";

export const UserDetailsForm = (userDetails: any) => {
  const [base64Image, setBase64Image] = useState<any>();
  const [loading, setLoading] = useState(false);

  const name = get(userDetails, "userDetails.fullName", "");
  const email = get(userDetails, "userDetails.email", "");
  const title = get(userDetails, "userDetails.title", "");
  const language = get(userDetails, "userDetails.language", "");
  const timeZone = get(userDetails, "userDetails.timezone", "");
  const avatar = get(userDetails, "userDetails.avatar", "");

  let formData;
  const { register, control, handleSubmit }: any = useForm({
    defaultValues: {
      email: email,
    },
  });

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

  const onSubmit = async (data: any) => {
    isEmpty(base64Image)
      ? (formData = data)
      : (formData = { ...data, avatar: base64Image });
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/profile`, {
        method: "PATCH",
        body: JSON.stringify({
          formData,
        }),
      });
      showSuccessToast("Updated profile successfully");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      logger.error(err);
      showErrorToast("Failed to update profile");
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:py-8 lg:px-8 dark:from-black dark:to-slate-900 dark:lg:bg-gradient-to-b">
      <form
        className="space-y-8 mx-auto max-w-7xl flex justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[70%] px-14 py-10 border border-gray-200 dark:border-gray-600">
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:col-span-6 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-200">
                General
              </h2>
              <p className="mt-1 text-sm text-gray-500 mb-3">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div className="sm:grid sm:grid-cols-6 sm:items-center sm:gap-4 sm:pt-5 dark:sm:border-gray-900">
              <Label>Name</Label>
              <div className="relative mt-1 sm:col-span-3 sm:mt-0">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserCircleIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Input
                  name="fullName"
                  className="max-w-lg pl-10 rounded-md focus:border-gray-400 dark:focus:border-gray-800"
                  {...register("fullName", { required: true })}
                  defaultValue={name}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-6 sm:items-center sm:gap-4 sm:pt-5 dark:sm:border-gray-900">
              <Label>Email</Label>

              <div className="relative mt-1 sm:col-span-3 sm:mt-0">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400 "
                    aria-hidden="true"
                  />
                </div>
                <EmailInput
                  name="email"
                  className="max-w-lg pl-10 bark:border rounded-md text-gray-400 dark:text-gray-500"
                  defaultValue={email}
                  disabled
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-6 sm:items-center sm:gap-4 sm:pt-5 dark:sm:border-gray-900">
              <Label>Photo</Label>
              <div className="mt-1 flex items-center col-span-3">
                {isEmpty(avatar) && isEmpty(base64Image) ? (
                  <PhAvatar />
                ) : (
                  <Image
                    src={!isEmpty(base64Image) ? base64Image : avatar}
                    alt="err"
                    className="h-8 w-8 rounded-full"
                    height={20}
                    width={20}
                  />
                )}
                <div className="ml-4 flex">
                  <div className="relative flex cursor-pointer items-center rounded bg-white border border-gray-300 py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 hover:bg-gray-50">
                    <label
                      htmlFor="user-photo"
                      className="pointer-events-none relative text-sm font-medium text-gray-900"
                    >
                      <span>Change</span>
                      <span className="sr-only"> User photo</span>
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
            <div className="sm:grid sm:grid-cols-6 sm:items-center sm:gap-4 sm:pt-5 dark:sm:border-gray-900">
              <Label>Title</Label>
              <div className="relative mt-1 rounded-md shadow-sm col-span-3">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <BriefcaseIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>

                <select
                  {...register("title")}
                  id="title"
                  name="title"
                  autoComplete="title"
                  defaultValue={title}
                  className="block w-full rounded p-2.5 pl-10 text-sm text-gray-900 dark:text-gray-200 focus:border-gray-200 border-gray-300 shadow-sm focus:ring-gray-300 dark:border-none dark:bg-gray-900 dark:placeholder-gray-400 dark:focus:border-gray-800 dark:focus:ring-gray-800"
                >
                  <option selected>Choose a Title</option>
                  <option>Software Engineer</option>
                  <option>Product Manager</option>
                  <option>Designer</option>
                  <option>Manager</option>
                  <option>Director</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div className="border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-200 ">
                Preferences
              </h2>
              <p className="mt-1 text-sm text-gray-500 mb-3">
                Your personalized preference displayed in your account
              </p>
            </div>

            <div className="sm:grid sm:grid-cols-6 sm:items-center sm:gap-4 sm:pt-5 dark:sm:border-gray-900">
              <Label>Language</Label>
              <div className="col-span-3">
                <select
                  {...register("language")}
                  id="language"
                  name="language"
                  defaultValue={language}
                  autoComplete="language"
                  className="block w-full rounded p-2.5 text-sm border-gray-300 shadow-sm text-gray-900 focus:border-gray-200 focus:ring-gray-300 dark:border-none dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-800 dark:focus:ring-gray-800"
                >
                  <option />
                  <option>English(UK)</option>
                  <option>English(US)</option>
                  <option>French</option>
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-6 sm:items-center sm:gap-4 sm:pt-5 dark:sm:border-gray-900">
              <Label>Time Zone</Label>
              <div className="col-span-3">
                <select
                  {...register("timezone")}
                  id="timezone"
                  name="timezone"
                  autoComplete="time-zone"
                  defaultValue={timeZone}
                  className="block w-full rounded p-2.5 text-sm text-gray-900 border-gray-300 shadow-sm focus:border-gray-200 focus:ring-gray-300 dark:border-none dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-gray-800 dark:focus:ring-gray-800"
                >
                  <option />
                  <option>GMT+2</option>
                  <option>GMT+4</option>
                  <option>GMT+8</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8">
            <Button
              className="ml-2 w-[100px] rounded-none"
              type="submit"
              loading={loading}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
