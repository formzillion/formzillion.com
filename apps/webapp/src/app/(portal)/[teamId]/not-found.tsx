"use client";
import Image from "next/image";
import { get } from "lodash";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Button from "@/ui/Buttons";

export default function FormNotFound() {
  const pathName = usePathname();
  const splittedPath = pathName?.split("/");
  const teamSlug = get(splittedPath, "1", "");
  const router = useRouter();
  return (
    <>
      <div className="flex mt-10 justify-center">
        <Image
          src={"/empty_submissions.svg"}
          alt="Empty Form logo"
          width={250}
          height={250}
        />
      </div>

      <h1 className="text-center mt-4 font-light text-2xl">{`Form not found!. Go back to Forms.`}</h1>
      <div className="flex justify-center mt-4">
        <Button onClick={() => router.push(`/${teamSlug}`)}>
          Back to Forms
        </Button>
      </div>
    </>
  );
}
