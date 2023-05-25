import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const UpgradePlan = ({ url = "" }: any) => {
  console.log('%c 🌽 url: ', 'font-size:12px;background-color: #ED9EC7;color:#fff;', url);
  return (
    <div className="flex text-red-600 text-sm ml-2">
      <Link href={`${url}`} className="flex hover:underline">
        <LockClosedIcon className="h-4 w-4" />
        Upgrade to unlock
      </Link>
    </div>
  );
};

export default UpgradePlan;
