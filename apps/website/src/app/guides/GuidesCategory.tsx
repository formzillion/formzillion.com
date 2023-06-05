"use client";
import Link from "next/link";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { platforms } from "./content";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const allList: { title: string; image: string; url: string, comingSoon: boolean }[] = [];
platforms.map((item: any) => {
  allList.push(...item?.list);
});

allList.sort((a, b) => a.title.localeCompare(b.title));

const allCategoryIndex = platforms.findIndex(
  (item: any) => item.category === "All"
);

if (allCategoryIndex === -1) {
  platforms.unshift({
    category: "All",
    list: allList,
  });
} else {
  platforms;
}

export default function GuidesCategory() {
  return (
    <div className="px-2 pt-16 sm:px-0 flex space-x-6 relative">
      <Tab.Group vertical={true}>
        <Tab.List className={"w-[200px] space-y-4 text-start"}>
          {platforms?.map((item, idx: number) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  "w-full p-2 text-sm font-medium text-gray-300 focus-visible:border focus-visible:border-gray-900 text-start rounded",
                  selected
                    ? "rounded bg-gray-900/20 border border-gray-900 hover:border-gray-900 text-orange-500 focus-visible:border focus-visible:border-gray-900 outline-0"
                    : "text-blue-100 hover:bg-gray-900/40"
                )
              }
            >
              {item.category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-full">
          {platforms?.map((items: any, idx) => (
            <Tab.Panel
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-content-center justify-center"
            >
              {items?.list?.map(
                (app: any, index: number) =>
                  app?.comingSoon === false && (
                    <Link href={app?.url} key={index}>
                      <div className="rounded bg-gray-900/20 border border-gray-900 hover:border-gray-700 flex flex-col items-center py-8 space-y-4">
                        <div className="h-16 w-16">
                          <Image
                            src={app.image}
                            alt={app.title}
                            height={80}
                            width={80}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-2xl">{app.title}</p>
                      </div>
                    </Link>
                  )
              )}

              {/* Coming Soon Apps */}
              {items?.list?.map(
                (app: any, index: number) =>
                  app?.comingSoon === true && (
                    <div
                      key={index}
                      className="rounded relative bg-gray-900/20 border border-gray-900 flex flex-col items-center py-8 space-y-4"
                    >
                      <div className="h-16 w-16">
                        <Image
                          src={app.image}
                          alt={app.title}
                          height={80}
                          width={80}
                          className="object-contain"
                        />
                      </div>
                      <p className="text-2xl pb-2">{app.title}</p>
                      <div className="absolute bottom-0 bg-gray-950 border-t text-gray-500 rounded border-gray-900 w-full text-center text-sm p-1">
                        Coming Soon
                      </div>
                    </div>
                  )
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
