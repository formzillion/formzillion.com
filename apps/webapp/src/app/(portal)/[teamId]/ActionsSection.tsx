"use client";
import { useState } from "react";
import CreateFormModal from "./CreateFormModal";

export default function ActionsSection({ teamSlug }: any) {
  const [showModal, setShowModal] = useState<any>(false);

  return (
    <div>
      <button
        type="button"
        className="w-full text-center items-center border border-transparent bg-orange-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none  sm:ml-3"
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
        />
      )}
    </div>
  );
}
