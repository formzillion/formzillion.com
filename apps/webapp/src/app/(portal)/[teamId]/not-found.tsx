"use client";
import React, { useState } from "react";
import Image from "next/image";
import CreateFormModal from "./CreateFormModal";
import { useSupabase } from "@/components/SupbaseProvider";
import { get } from "lodash";
import { usePathname } from "next/navigation";

export default function EmptyForm() {
  const pathName = usePathname();
  const teamSlug = pathName?.split("/")[1];
  const [showModal, setShowModal] = useState<any>(false);
  const { session } = useSupabase();
  const userEmail = get(session, "user.email", "");
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

      <h1 className="text-center mt-4 font-light text-2xl">{`Form not found!. Let's create a new form.`}</h1>
      <div className="text-center mt-4">
        <button
          type="button"
          className="text-center items-center border border-transparent bg-orange-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none  sm:ml-3"
          onClick={() => setShowModal(true)}
        >
          Add New
        </button>
      </div>
      {showModal && (
        <CreateFormModal
          closeModal={() => {
            setShowModal(false);
          }}
          teamSlug={teamSlug}
          userEmail={userEmail}
        />
      )}
    </>
  );
}
