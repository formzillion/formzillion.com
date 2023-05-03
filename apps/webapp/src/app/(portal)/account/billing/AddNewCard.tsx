"use client";
import { useState, useEffect, useCallback } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { SetupIntent } from "@stripe/stripe-js";

import Modal, { ModalTitle } from "@/components/Modal";
import ElementsFormV2 from "./ElementsFormV2";

export default function AddNewCardModal({
  isOpen,
  closeModal,
  stripePromise,
  userDetails,
}: any) {
  const [setupIntent, setSetupIntent] = useState<SetupIntent | null>(null);

  const getData = useCallback(async () => {
    const data = await fetch("/api/stripe/payment-intents", {
      method: "POST",
      body: JSON.stringify({ user: userDetails }),
    })
      .then((response) => response.json())
      .then((data) => setSetupIntent(data));
  }, []);

  useEffect(() => {
    getData().then(() => console.log("called"));
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={() => closeModal()}>
      <ModalTitle title="Add New Card" toggle={() => closeModal()} />
      <div className="p-4">
        {setupIntent && setupIntent.client_secret ? (
          <Elements
            stripe={stripePromise}
            options={{
              appearance: {
                theme: "flat",
                variables: {
                  colorIcon: "#efefef",
                  fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                },
              },
              clientSecret: setupIntent.client_secret,
            }}
          >
            <ElementsFormV2
              setupIntent={setupIntent}
              clientSecret={setupIntent.client_secret}
              closeModal={closeModal}
            />
          </Elements>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Modal>
  );
}
