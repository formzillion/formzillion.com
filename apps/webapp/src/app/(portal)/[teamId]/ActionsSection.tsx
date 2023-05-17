"use client";
import { useState } from "react";
import CreateFormModal from "./CreateFormModal";
import { useSupabase } from "@/components/SupbaseProvider";
import { get } from "lodash";

export default function ActionsSection({ teamSlug }: any) {
  const [showModal, setShowModal] = useState<any>(false);
  const { session } = useSupabase();
  const userEmail = get(session, "user.email", "");
  return (
    <div className="flex justify-center ">
      <button
        type="button"
        className="w-full text-center items-center  border border-transparent bg-orange-600 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none  sm:ml-3 h-[40px] px-1 "
        onClick={() => setShowModal(true)}
      >
        Add New
      </button>

      {showModal && (
        <CreateFormModal
          closeModal={() => {
            setShowModal(false);
          }}
          teamSlug={teamSlug}
          userEmail={userEmail}
        />
      )}
    </div>
  );
}
