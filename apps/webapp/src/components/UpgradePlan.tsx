import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const UpgradePlan = ({ plan = "" }: any) => {
  return (
    <div className="flex text-red-600 text-sm">
      <Link href={`${plan}`} className="flex hover:underline">
        <LockClosedIcon className="h-4 w-4" />
        Upgrade to unlock
      </Link>
    </div>
  );
};

export default UpgradePlan;
