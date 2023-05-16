import Link from "next/link";
import { startCase } from "lodash";
import {
  ArrowRightCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import { getTimeAgo } from "@/utils/timeAgo";
import MenuCard from "@/components/MenuCard";
import CopyToClipboard from "@/ui/CopyToClipboard";

export default function FormListItem({
  form,
  teamSlug,
  formSubmissionCount,
}: any) {
  const redirectPath = `${process.env.NEXT_PUBLIC_APP_URL}/${teamSlug}/${form.id}/settings`;

  const menuItems = [
    {
      text: "Spam Filter",
      link: `${redirectPath}/spam-filter`,
    },
    {
      text: "Autoresponders",
      link: `${redirectPath}/auto-responders`,
    },
    {
      text: "Redirects",
      link: `${redirectPath}/redirects`,
    },
  ];

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/f/${form.id}`;

  return (
    <div className="dark:bg-black border border-gray-300 dark:border-gray-800 hover:border-gray-400 transition-all dark:hover:bg-gradient-to-r dark:from-orange-700 dark:via-orange-400 dark:to-yellow-500 p-[1.5px] dark:text-white  xl:w-[380px] my-2 mx-4 sm:mx-2 md:mx-6 lg:mx-2">
      <div className="px-[33px] py-[38px] md:px-[25px] md:py-[25px] w-full dark:bg-black relative">
        <div className="flex justify-between items-end ">
          <h4 className="text-[19px] leading-6 font-medium font-['Space_Grotesk'] text-gray-700 dark:text-white">
            {startCase(form.name)}
          </h4>
          <MenuCard
            menuItems={menuItems}
            title={""}
            icon={
              <EllipsisHorizontalIcon className="w-5 h-5 text-gray-600 dark:text-gray-500" />
            }
          />
        </div>
        <p className="text-[13px] font-medium text-neutral-500 dark:text-gray-300 leading-[18px]">
          Created {getTimeAgo(form.createdAt)}
        </p>
        <div className="mt-[18px] text-[13px] font-medium leading-[18px] flex">
          <p className="w-[90%] truncate text-gray-500 dark:text-gray-300">
            {url}
          </p>
          <CopyToClipboard text={url} />
        </div>
        <div className="border-t border-gray-400 mt-[22px] mb-[18px]"></div>
        <p className="text-base leading-[22px] text-neutral-500 dark:text-gray-300 font-medium mb-4">
          SUBMISSIONS
        </p>
        <div className="grid grid-cols-4 p-0">
          <div className="text-center">
            <p className="text-lg font-bold text-neutral-500 dark:text-gray-300">
              {formSubmissionCount}
            </p>
            <p className="text-[13px] font-medium text-gray-600 dark:text-gray-50">
              Last Day
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-neutral-500 dark:text-gray-300">
              {formSubmissionCount}
            </p>
            <p className="text-[13px] font-medium text-gray-600 dark:text-gray-50">
              Last Week
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-neutral-500 dark:text-gray-300">
              {formSubmissionCount}
            </p>
            <p className="text-[13px] font-medium text-gray-600 dark:text-gray-50">
              Last Month
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-neutral-500 dark:text-gray-300">
              {formSubmissionCount}
            </p>
            <p className="text-[13px] font-medium text-gray-600 dark:text-gray-50">
              Lifetime
            </p>
          </div>
        </div>
        <div className="absolute right-4 bottom-2">
          <Link
            href={{
              pathname: `/${teamSlug}/${form.id}`,
              query: { formName: form.name },
            }}
          >
            <ArrowRightCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-gray-700 hover:scale-105 hover:transition hover:ease-in-out" />
          </Link>
        </div>
      </div>
    </div>
  );
}
