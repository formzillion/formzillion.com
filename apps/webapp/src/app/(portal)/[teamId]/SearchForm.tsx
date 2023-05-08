"use client";
import React, { useState } from "react";
import { isEmpty } from "lodash";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import ActionsSection from "./ActionsSection";
import FormListItem from "./FormListItem";
import EmptyForm from "./EmptyForm";
import NotFoundForms from "./NotFoundForms";

export default function SearchForm({ forms, teamSlug, formCounts }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredForms = forms.filter((form: any) =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between my-8 space-x-2 sm:mr-4 lg:mr-7 mx-auto sm:max-w-7xl">
        <div className="w-[80%] lg:w-[87%]">
          <div className="ml-2">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 flex-shrink-0 text-[#444444]"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full py-2 pl-10 pr-3 text-md leading-md dark:bg-black border focus:border-gray-400 border-gray-300 dark:border-gray-700 text-[#444444] placeholder:text-[#444444] placeholder:text-md focus:ring-0 dark:text-gray-300 dark:placeholder:text-gray-300 dark:focus:border-gray-500 dark:focus:ring-0"
                placeholder="Search your forms..."
                type="search"
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="w-[20%] lg:w-[10%]">
          <ActionsSection teamSlug={teamSlug} />
        </div>
      </div>
      {!isEmpty(forms) ? (
        !isEmpty(filteredForms) ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredForms.map((form: any, idx: any) => {
              const count = formCounts[form.id] || 0;
              return (
                <FormListItem
                  form={form}
                  key={idx}
                  teamSlug={teamSlug}
                  formSubmissionCount={count}
                />
              );
            })}
          </div>
        ) : (
          <NotFoundForms
            title={"No results Found"}
            description={`We couldn't find what you searched for. <br /> Please try searching again.`}
          />
        )
      ) : (
        <EmptyForm teamSlug={teamSlug} />
      )}
    </>
  );
}
