"use client";
import React, { useState } from "react";
import Image from "next/image";
import CreateFormModal from "./CreateFormModal";

export default function EmptyForm({ teamSlug }: any) {
  const [showModal, setShowModal] = useState<any>(false);
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

      <h1 className="text-center mt-4 font-light text-2xl">{`Let's create your first form!`}</h1>
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
        />
      )}
    </>
  );
}
