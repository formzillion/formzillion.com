"use client";
import { useSearchParams } from "next/navigation";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import Image from "next/image";

export default function ThankYou() {
  const router = useSearchParams();
  const formId = router?.get("formId");
  const status = router?.get("status");
  const referer = router?.get("referer");

  const [redirectData, setRedirectData] = useState<any>({
    title: "Thanks!",
    message: "The form was submitted successfully.",
    button: referer,
    buttonUrl: referer,
  });

  async function getFomData() {
    await fetch("/api/form/single-form-data", {
      method: "POST",
      body: JSON.stringify({ formId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!isEmpty(data?.data?.redirectData)) {
          setRedirectData(data?.data?.redirectData);
        }
      });
  }

  useEffect(() => {
    getFomData();
  }, [formId]);

  let successMessage: any = {};
  if (!isEmpty(redirectData?.title)) {
    successMessage = redirectData;
  } else {
    successMessage = {
      title: "Thanks!",
      message: "The form was submitted successfully.",
      button: referer,
      buttonUrl: referer,
    };
  }
  const faillMessage = {
    title: "Sorry!",
    message: "Your form was not submitted successfully.",
    button: referer,
    buttonUrl: referer,
  };

  let message;
  if (status === "OK") {
    message = successMessage;
  } else {
    message = faillMessage;
  }
  return (
    <div className="flex h-screen w-screen  flex-col items-center justify-center bg-white space-y-4">
      <div className="bg-gray-100 p-10 text-center flex flex-col items-center rounded-md space-y-5 max-w-[600px]">
        {status === "OK" ? (
          <CheckCircleIcon className="w-12 h-12 text-green-500" />
        ) : (
          <XCircleIcon className="w-12 h-12 text-red-500" />
        )}
        <h1 className="text-5xl text-gray-700">{message?.title}</h1>
        <p className="text-gray-700 text-xl">{message.message}</p>
        {typeof referer === "string" && (
          <a href={message.buttonUrl} className="text-orange-500 underline">
            {message.button}
          </a>
        )}
      </div>
      <div className="text-gray-1000 flex">
        <span className="text-gray-600">Powered by</span>&nbsp;
        <a
          href={process.env.NEXT_PUBLIC_APP_URL}
          className="text-orange-500 hover:text-orange-600 hover:underline"
        >
          <Image
            src={"/logos/fz_logo_full.svg"}
            width={150}
            height={25}
            alt="Formzillion Logo"
            className=" object-contain"
          />
        </a>
      </div>
    </div>
  );
}
