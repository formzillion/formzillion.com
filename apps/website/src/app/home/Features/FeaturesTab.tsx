"use client";
import { Tab } from "@headlessui/react";
import {
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
    url: "https://docs.formzillion.com/features/spam-filtering",
  },
  {
    tabName: "User Redirects",
    logo: <ArrowTopRightOnSquareIcon className="w-6 h-6" />,
    icons: <RedirectsIllustration />,
    title: "Impress your users with an amazing after-submission experience.",
    description:
      "Redirect your users to a custom URL after they submit your form. Or use our built-in thank you page to show custom messages to your users.",
    url: "https://docs.formzillion.com/features/redirects",
  },
  {
    tabName: "Collabration",
    logo: <UserCircleIcon className="w-6 h-6" />,
    icons: <InviteTeamIllustration />,
    title: "Collaborate with your teams and clients.",
    description:
      "Create teams, share forms and user submissions with your team members and clients. You can also set up custom roles and permissions to control who can access what.",
    url: "https://docs.formzillion.com/features/collaboration",
  },
  {
    tabName: "Integrations",
    logo: <PuzzlePieceIcon className="w-6 h-6" />,
    icons: <IntegrationsIllustration />,
    title: "Keep your clients and team members in sync and stay productive.",
    description:
      "Connect your favorite tools to Formzillion and automate your communication with clients and team members. Autoreply to your users, send notifications to your team members and clients, and much more.",
    url: "https://docs.formzillion.com/integrations",
  },
];
export default function FeaturesTab() {
  return (
    <div className="text-white mx-auto max-w-6xl p-8 mt-8">
      <div className="flex justify-center mb-5">
        <h2 className="text-3xl py-4">Features</h2>
      </div>
      <Tab.Group>
        <Tab.List className="flex justify-between">
          {featuresData.map((category: any, idx: number) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  "w-full py-2 flex flex-col items-center gap-1",
                  selected
                    ? `border-b-0 border border-gray-600  focus-visible:outline-none text-orange-600`
                    : "border-b border-gray-600 hover:bg-gray-200/5 transition-all ease-in-out logo-hover:animate-pulse"
                )
              }
            >
              <div className="logo">{category.logo}</div>
              {category.tabName}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="border border-gray-600 border-t-0 relative  p-8 px-4">
          {featuresData.map((posts: any, idx: number) => (
            <Tab.Panel key={idx} className={classNames()}>
              <div className="md:flex items-center">
                <div>{posts.icons}</div>
                <div className="space-y-6 animate-enter">
                  <h3 className="text-xl md:text-3xl">{posts.title}</h3>
                  <p className="text-sm">{posts.description}</p>
                  <a
                    href={posts.url}
                    className="flex justify-center items-center text-white text-left font-bold w-[210px] h-[60px] bg-orange-600 font-['Satoshi'] hover:bg-orange-800"
                  >
                    Learn More
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
