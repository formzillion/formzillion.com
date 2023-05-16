import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { isEmpty, startCase } from "lodash";
import Image from "next/image";
import Link from "next/link";

const TeamName = ({ selectedTeam }: any) => {
  return (
    <div className="flex items-center dark:text-white text-gray-800">
      {!isEmpty(selectedTeam.avatar) ? (
        <Image
          src={selectedTeam.avatar}
          alt="err"
          className="mr-2 h-5 w-5 rounded-full"
          height={20}
          width={20}
        />
      ) : (
        <Avatar className="mr-2 h-5 w-5">
          <AvatarImage
            src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
            alt={selectedTeam.label}
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      )}
      <Link
        href={`${process.env.NEXT_PUBLIC_APP_URL}/${selectedTeam.value}`}
        className="flex items-center"
      >
        {selectedTeam?.label?.length >= 10 ? (
          <div className="w-[100px] truncate text-base">
            {startCase(selectedTeam.label)}
          </div>
        ) : (
          <div className="text-base">{startCase(selectedTeam.label)}</div>
        )}
        {!isEmpty(selectedTeam.planName) && (
          <span className="bg-green-300 text-gray-600 px-2 text-xs rounded-full ml-2 flex items-center">
            {selectedTeam.planName}
          </span>
        )}
      </Link>
    </div>
  );
};

export default TeamName;
