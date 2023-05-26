import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

import TeamSwitcher from "@/app/(portal)/shared/TeamSwitcher";
import UserDropdown from "./UserDropdown";
import { ModeToggle } from "./ModeToggle";
import AppLogo from "@/ui/AppLogo";

export function BreadcrumbSeparator() {
  return (
    <div className="text-gray-600">
      <ChevronRightIcon className="h-4 w-4" />
    </div>
  );
}

export default function Navbar({ teams, user }: any) {
  return (
    <div className="dark:bg-black mx-auto sm:px-6 py-3 border-b relative hidden sm:block">
      {/* Static Navbar for desktop */}
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center space-x-2 sm:space-x-6 ml-1 sm:ml-0">
          <AppLogo />
          <BreadcrumbSeparator />
          {/*Team Logo Section*/}
          <TeamSwitcher teams={teams} />
        </div>
        <div className="sm:flex items-center space-x-2 mr-0 hidden">
          <div className="dark:text-gray-200 text-base space-x-4 flex items-center">
            <a
              href="https://docs.formzillion.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              Docs
              <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
            </a>
          </div>
          <ModeToggle />
          {/* User account dropdown */}
          <UserDropdown user={user} />
        </div>
      </div>
    </div>
  );
}
