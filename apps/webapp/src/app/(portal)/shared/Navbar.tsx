import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

import AppLogo from "@/ui/AppLogo";
import TeamSwitcher from "@/components/TeamSwitcher";
import UserDropdown from "./UserDropdown";
import { ModeToggle } from "./ModeToggle";
import FormId from "../FormId";

export function BreadcrumbSeparator() {
  return (
    <div className="text-gray-600">
      <ChevronRightIcon className="h-4 w-4" />
    </div>
  );
}

export default function Navbar({ teams, user }: any) {
  return (
    <div className="dark:bg-black px-2 py-3">
      {/* Static Navbar for desktop */}
      <div className="hidden lg:flex lg:items-center lg:justify-between">
        <div className="flex flex-row items-center space-x-6">
          <AppLogo />
          <BreadcrumbSeparator />
          {/*Team Logo Section*/}
          <TeamSwitcher teams={teams} />
          <FormId />
        </div>
        <div className="flex items-center space-x-2 mr-4">
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
