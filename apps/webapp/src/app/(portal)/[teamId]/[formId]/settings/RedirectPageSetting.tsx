"use client";
import { useState } from "react";
import { get, isEmpty } from "lodash";

import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { Input } from "@/ui/Input/SimpleInput";
import Header from "@/ui/Header";
import CardFooter from "@/ui/CardFooter";
import { useRouter } from "next/navigation";
import UpgradePlan from "@/components/UpgradePlan";
import { getTeamDetails } from "@/utils/getTeamDetails";

const RedirectPageSetting = ({ formDetail }: any) => {
  const router = useRouter();
  const { plan, url, disabled } = getTeamDetails(formDetail.team);
  let previousSelectedValue;

  if (isEmpty(formDetail?.redirectData) && isEmpty(formDetail?.redirectUrl)) {
    previousSelectedValue = "default";
  } else if (!isEmpty(formDetail.redirectData)) {
    previousSelectedValue = "customContent";
  } else if (!isEmpty(formDetail.redirectUrl)) {
    previousSelectedValue = "redirectionUrl";
  }

  const [selectedValue, setSelectedValue] = useState(previousSelectedValue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    let redirectData: any = {};

    if (selectedValue === "default") {
      redirectData.type = "default";
    } else if (selectedValue === "customContent") {
      redirectData.type = "customContent";
      const keysToCheck = ["title", "message", "buttonText", "buttonUrl"];

      keysToCheck.map((key) => {
        if (!isEmpty(e.target[key].value)) {
          redirectData[key] = e.target[key].value;
        }
      });
    } else if (selectedValue == "redirectionUrl") {
      redirectData.type = "redirectionUrl";
      redirectData["redirectUrl"] = e.target["redirectUrl"].value;
    }

    const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/form/redirect-data`,
      {
        method: "POST",
        body: JSON.stringify({ ...redirectData, formId: formDetail.id, plan }),
      }
    );
    const data = await response.json();

    if (response?.status === 201) {
      showSuccessToast("Redirect details saved successfully");
    } else if (response?.status === 400) {
      showErrorToast(data.message);
    } else {
      showErrorToast("Something went wrong");
    }
    setLoading(false);
    router.refresh();
  };

  const handleRadioChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 px-6 divide-y divide-gray-300 dark:divide-gray-700">
        <Header title={"Redirects"} />
        <div className="text-gray-500 py-4">
          <div className="divide-y divide-gray-300 dark:divide-gray-800 space-y-2">
            <div className="py-4 flex">
              <input
                type="radio"
                id="default"
                name="customfields"
                value="default"
                defaultChecked={
                  isEmpty(formDetail?.redirectData) &&
                  isEmpty(formDetail?.redirectUrl)
                }
                onChange={handleRadioChange}
                className="mr-3"
              />
              <label
                htmlFor={"default"}
                className="w-full justify-between text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                <b className=" w-full flex justify-between text-start text-sm font-medium text-gray-900 dark:text-white">
                  Formzillion default thank you page
                </b>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Redirect to formzillion/thank-you
                </p>
              </label>
            </div>

            <div className="py-4 flex">
              <div>
                <input
                  type="radio"
                  id="customContent"
                  name="customfields"
                  value="customContent"
                  defaultChecked={!isEmpty(formDetail?.redirectData)}
                  onChange={handleRadioChange}
                  className="mr-3"
                  disabled={disabled}
                />
              </div>
              <label htmlFor={"customContent"} className="w-full">
                <b className=" w-full flex text-start text-sm font-medium text-gray-900 dark:text-white">
                  Custom Page Content{""}
                  {plan === ("free" || "basic") && <UpgradePlan url={url} />}
                </b>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Users will able to see custom message
                </p>
                <div
                  className={`space-y-4 mt-2 ${
                    !(selectedValue === "customContent") ? "opacity-60" : ""
                  }`}
                >
                  <div className="space-y-2">
                    <label htmlFor={"title"} className="w-full">
                      <b className=" w-full flex justify-between text-start text-xs font-medium text-gray-900 dark:text-white">
                        Title
                      </b>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        This field will be title for redrict page
                      </p>
                    </label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      defaultValue={formDetail?.redirectData?.title}
                      disabled={
                        !(selectedValue === "customContent") && disabled
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor={"message"} className="w-full">
                      <b className=" w-full flex justify-between text-start text-xs font-medium text-gray-900 dark:text-white">
                        Message
                      </b>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        This field will be Message for redrict page
                      </p>
                    </label>
                    <Input
                      id="message"
                      name="message"
                      defaultValue={formDetail?.redirectData?.message}
                      type="text"
                      disabled={
                        !(selectedValue === "customContent") && disabled
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor={"buttonText"} className="w-full">
                      <b className=" w-full flex justify-between text-start text-xs font-medium text-gray-900 dark:text-white">
                        Button
                      </b>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        This field will be text for button on redrict page
                      </p>
                    </label>
                    <Input
                      id="buttonText"
                      name="buttonText"
                      type="text"
                      defaultValue={formDetail?.redirectData?.button}
                      disabled={
                        !(selectedValue === "customContent") && disabled
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor={"buttonUrl"} className="w-full">
                      <b className=" w-full flex justify-between text-start text-xs font-medium text-gray-900 dark:text-white">
                        Button Url
                      </b>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        This field will be redirect link for button on redrict
                        page
                      </p>
                    </label>
                    <Input
                      id="buttonUrl"
                      name="buttonUrl"
                      defaultValue={formDetail?.redirectData?.buttonUrl}
                      type="text"
                      disabled={
                        !(selectedValue === "customContent") && disabled
                      }
                    />
                  </div>
                </div>
              </label>
            </div>
            <div className="py-4 flex">
              <div>
                <input
                  type="radio"
                  id="redirectionUrl"
                  name="customfields"
                  value="redirectionUrl"
                  defaultChecked={!isEmpty(formDetail?.redirectUrl)}
                  onChange={handleRadioChange}
                  className="mr-3"
                  disabled={disabled}
                />
              </div>
              <label htmlFor={"redirectionUrl"} className="w-full">
                <b className=" w-full flex text-start text-sm font-medium text-gray-900 dark:text-gray-300">
                  Custom redirection URL
                  {plan === ("free" || "basic") && <UpgradePlan url={url} />}
                </b>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Users will be sent here after a successful submission.
                </p>
                <Input
                  id="redirectUrl"
                  name="redirectUrl"
                  type="text"
                  className={
                    !(selectedValue === "redirectionUrl") ? "opacity-60" : ""
                  }
                  disabled={!(selectedValue === "redirectionUrl") && disabled}
                  defaultValue={formDetail?.redirectUrl}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <CardFooter
        title={"Learn more about"}
        type="submit"
        urlText="Redirects"
        url="https://docs.formzillion.com/features/redirects"
        btnText={"Save"}
        loading={loading}
      />
    </form>
  );
};
export default RedirectPageSetting;
