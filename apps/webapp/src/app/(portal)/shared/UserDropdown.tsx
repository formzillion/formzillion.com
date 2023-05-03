import {
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  BellIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { isEmpty, startCase } from "lodash";

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
import Logout from "./Logout";

export default function UserDropdown({ user }: any) {
  const userName = user?.fullName;
  const userEmail = user?.email;
  const name = userEmail?.split("@")[0];
  const avatar = user?.avatar;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full bg-transparent hover:bg-transparent focus:bg-transparent focus:border-none focus-visible:border-none"
        >
          {isEmpty(avatar) ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://avatar.vercel.sh/user.png" alt="User" />
              <AvatarFallback>SC</AvatarFallback>
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
          <Link href={"/account"}>
            <DropdownMenuItem className="cursor-pointer">
              <UserCircleIcon className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href={"/account/password"}>
            <DropdownMenuItem className="cursor-pointer">
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>
          </Link>
          <a href="https://formzillion.com/" target="_blank" rel="noreferrer">
            <DropdownMenuItem className="cursor-pointer">
              <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
              Back To Formzillion
              <ArrowTopRightOnSquareIcon className="inline h-4 w-4 ml-1" />
            </DropdownMenuItem>
          </a>
          <Link href={"#"}>
            <DropdownMenuItem className="cursor-pointer">
              <BellIcon className="mr-2 h-4 w-4" />
              Join our Slack
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
