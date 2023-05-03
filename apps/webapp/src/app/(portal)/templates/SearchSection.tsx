import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchSection({ setSearchValue }: any) {
  const formMethods = useForm<any>();
  return (
    <div className="border-2 rounded-lg">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative focus-within:text-gray-400">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          {...formMethods.register("search", {
            onChange: (e: any) => {
              setSearchValue(e.target.value);
            },
          })}
          id="search"
          name="search"
          className="block w-full rounded-md border-0 py-3 pl-10 pr-3 focus:dark:bg-gray-900 focus:dark:text-gray-400 dark:bg-gray-900 dark:text-gray-400 focus:bg-white focus:text-gray-600 focus:ring-0 focus:placeholder:text-gray-500 sm:text-md sm:leading-6"
          placeholder="Search form templates"
          type="search"
        />
      </div>
    </div>
  );
}
