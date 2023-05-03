"use client";
import { useState } from "react";
import ZsButton from "@/components/Button";
import TestFormModal from "./settings/TestFormModal";

export default function ActionSection({ formId }: any) {
  const [showTestModal, setShowTestModal] = useState(false);

  const onClickTestForm = async () => {
    setShowTestModal(true);
  };

  return (
    <>
      <ZsButton onClick={onClickTestForm}>Test Form</ZsButton>
      {/*Test Form */}
      {showTestModal && (
        <TestFormModal
          formId={formId}
          closeModal={() => {
            setShowTestModal(false);
          }}
        />
      )}
    </>
  );
}
