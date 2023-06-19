"use client";
import { Tab } from "@headlessui/react";
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import SpamFiltersIllustration from "./SpamFilters/SpamFiltersIllustration";
import RedirectsIllustration from "./Redirects/RedirectsIllustration";
import InviteTeamIllustration from "./Collaboration/InviteTeamIllustration";
import IntegrationsIllustration from "./Integrations/IntegrationsIllustration";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const featuresData = [
  {
    tabName: "Spam Filter",
    logo: <ShieldCheckIcon className="w-6 h-6" />,
    icons: <SpamFiltersIllustration />,
    title: "Safeguard your forms from spam.",
    description:
      "Formzillion employs a combination of machine learning and human review to ensure that your form submissions are free of spam. Just enable the filters you need and we'll take care of the rest.",
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/spam-filtering`,
  },
  {
    tabName: "User Redirects",
    logo: <ArrowTopRightOnSquareIcon className="w-6 h-6" />,
    icons: <RedirectsIllustration />,
    title: "Impress your users with an amazing after-submission experience.",
    description:
      "Redirect your users to a custom URL after they submit your form. Or use our built-in thank you page to show custom messages to your users.",
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/redirects`,
  },
  {
    tabName: "Collabration",
    logo: <UserCircleIcon className="w-6 h-6" />,
    icons: <InviteTeamIllustration />,
    title: "Collaborate with your teams and clients.",
    description:
      "Create teams, share forms and user submissions with your team members and clients. You can also set up custom roles and permissions to control who can access what.",
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/collaboration`,
  },
  {
    tabName: "Integrations",
    logo: <PuzzlePieceIcon className="w-6 h-6" />,
    icons: <IntegrationsIllustration />,
    title: "Keep your clients and team members in sync and stay productive.",
    description:
      "Connect your favorite tools to Formzillion and automate your communication with clients and team members. Autoreply to your users, send notifications to your team members and clients, and much more.",
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/integrations`,
  },
];
export default function FeaturesTab() {
  return (
    <div className="text-white mx-auto max-w-6xl p-2 lg:p-8 md:mt-24 border-t border-gray-800 border-dashed">
      <div className="text-center mb-14">
        <h2 className="py-4 font-normal text-2xl sm:text-3xl lg:text-5xl">
          Features
        </h2>
      </div>
      <Tab.Group>
        <Tab.List className="flex justify-between">
          {featuresData.map((category: any, idx: number) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  "w-full py-2 flex flex-col items-center gap-1 text-xs sm:text-base",
                  selected
                    ? `border-b-0 border border-gray-600  focus-visible:outline-none text-orange-600 bg-gray-400/10 rounded-t border-dashed`
                    : "border-b border-gray-600 hover:bg-gray-400/10  transition-all ease-in-out logo-hover:animate-pulse border-dashed"
                )
              }
            >
              <div className="logo">{category.logo}</div>
              {category.tabName}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="border border-gray-600 border-dashed border-t-0 relative bg-gray-400/10  lg:p-8 px-4">
          {featuresData.map((posts: any, idx: number) => (
            <Tab.Panel key={idx} className={classNames()}>
              <div className="md:flex items-center">
                <div className="flex justify-center">{posts.icons}</div>
                <div className="space-y-6 animate-enter pb-4">
                  <h3 className="text-xl md:text-3xl">{posts.title}</h3>
                  <p className="text-base">{posts.description}</p>
                  <a
                    href={posts.url}
                    className="flex items-center text-orange-600 text-lg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn More
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
