import {
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { get, isEmpty, startCase } from "lodash";
import { FiSlack } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import Button from "@/ui/Buttons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import Settings from "./Settings";
import Logout from "./Logout";

export default function UserDropdown({ user }: any) {
  const userName = user?.fullName;
  const userEmail = user?.email;
  const name = userEmail?.split("@")[0];
  const [firstName = "", lastName = ""] = userName?.split(".");
  const avatarName = `${firstName.charAt(0)}${lastName.charAt(
    0
  )}`.toUpperCase();
  const personalUser = user.teams.filter(
    (user: any) => user.type === "personal"
  );
  const avatar = get(personalUser, "0.avatar", "");
  const slug = get(personalUser, "0.slug", "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 focus-visible:rounded-full bg-transparent hover:bg-transparent focus:bg-transparent focus-visible:border-0 focus-visible:outline-0"
        >
          {isEmpty(avatar) ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://avatar.vercel.sh/user.png" alt="User" />
              <AvatarFallback>{avatarName}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} alt="User" />
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {isEmpty(userName) ? startCase(name) : userName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Settings slug={slug} />
          <a href="https://formzillion.com/" target="_blank" rel="noreferrer">
            <DropdownMenuItem className="cursor-pointer">
              <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-500" />
              Formzillion Homepage
              <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
            </DropdownMenuItem>
          </a>
          <a
            href={"https://github.com/formzillion/formzillion.com/stargazers"}
            target="_blank"
            rel="noreferrer"
          >
            <DropdownMenuItem className="cursor-pointer">
              <FiGithub className="mr-2 h-3 w-3 text-gray-600" />
              Join our Github
              <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
            </DropdownMenuItem>
          </a>
          <a
            href={
              "https://formzillion.slack.com/join/shared_invite/zt-1urntbbmb-o0d6Qzdl~GzfePoZE7JTYw"
            }
            target="_blank"
            rel="noreferrer"
          >
            <DropdownMenuItem className="cursor-pointer">
              <FiSlack className="mr-2 h-3 w-3 text-gray-600" />
              Join our Community
              <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
            </DropdownMenuItem>
          </a>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
