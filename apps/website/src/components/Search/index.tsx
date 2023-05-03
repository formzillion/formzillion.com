import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Search() {

  return (
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
          className="block w-full py-2 pl-10 pr-3 text-xl leading-[27px] dark:bg-black border border-[#444444] text-[#444444] placeholder:text-[#444444] placeholder:text-xl"
          placeholder="Search your forms..."
          type="search"
        />
      </div>
    </div>
  );
}
