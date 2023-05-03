import React, { useState, FC } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { SetupIntent } from "@stripe/stripe-js";

import StripeTestCards from "./StripeTestCards";

type Props = {
  content: object;
  closeModal: any;
};

const ElementsFormV2: FC<{
  setupIntent?: SetupIntent | null;
  clientSecret?: any;
  closeModal?: any;
}> = ({ setupIntent = {}, closeModal }) => {
  const [input, setInput] = useState({
    cardholderName: "",
  });
  const [payment, setPayment] = useState({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const clientSecret = setupIntent?.client_secret || "";

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    elements.getElement(CardNumberElement);
    elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const paymentMethod: any = {
      billing_details: {
        name: input?.cardholderName,
      },
    };

    if (cardCvcElement) {
      paymentMethod.card = cardCvcElement;
    }

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: paymentMethod,
    });

    if (result.error) {
      // Display result.error.message in your UI.
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
      console.log("Card Added");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <StripeTestCards />
        <fieldset className="mb-2">
          <legend className="mb-3 block font-medium text-gray-600">
            Card holder name
          </legend>
          <input
            className="inline-block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 tracking-wider text-gray-600"
            type="Text"
            name="cardholderName"
            autoComplete="cc-name"
            value={input.cardholderName}
            onChange={handleInputChange}
            required
          />
        </fieldset>
        <fieldset className="mb-5">
          <label className="mb-3 block font-medium text-gray-600">
            Card number
          </label>
          <CardNumberElement
            className="inline-block w-full rounded-md border border-gray-300 bg-gray-50 py-3 px-3 tracking-wider text-gray-600"
            options={{
              placeholder: "•••• •••• •••• ••••",
            }}
          />
        </fieldset>
        <div className="grid grid-cols-2 gap-2">
          <fieldset className="mb-5">
            <label className="mb-3 block font-medium text-gray-600">
              Expiration date
            </label>
            <CardExpiryElement
              className="inline-block w-full rounded-md border border-gray-300 bg-gray-50 py-3 px-3  tracking-wider text-gray-600"
              options={{
                placeholder: "••/••",
              }}
            />
          </fieldset>
          <fieldset className="mb-5">
            <label className="mb-3 block font-medium text-gray-600">CVC</label>
            <CardCvcElement
              className="inline-block w-full rounded-md border border-gray-300 bg-gray-50 py-3 px-3 tracking-wider text-gray-600"
              options={{
                placeholder: "•••",
              }}
            />
          </fieldset>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="text-ceenter cursor-pointer rounded-md bg-gray-400 px-4 py-3 font-semibold text-white shadow-md"
            type="button"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            className="text-ceenter cursor-pointer rounded-md bg-orange-400 px-4 py-3 font-semibold text-white shadow-md"
            type="submit"
            disabled={
              !["initial", "succeeded", "error"].includes(payment.status) ||
              !stripe
            }
          >
            Continue
          </button>
        </div>
      </form>
      {/*<PaymentStatus status={payment.status} errorMessage={errorMessage} />
      <PrintObject content={payment} />*/}
    </>
  );
};

const PrintObject = ({ content }: Props) => {
  const formattedContent: string = JSON.stringify(content, null, 2);
  return <pre>{formattedContent}</pre>;
};

const PaymentStatus = ({
  status,
  errorMessage,
}: {
  status: string;
  errorMessage: string;
}) => {
  switch (status) {
    case "processing":
    case "requires_payment_method":
    case "requires_confirmation":
      return <h2>Processing...</h2>;

    case "requires_action":
      return <h2>Authenticating...</h2>;

    case "succeeded":
      return <h2>Payment Succeeded</h2>;

    case "error":
      return (
        <>
          <h2>Error</h2>
          <p className="error-message">{errorMessage}</p>
        </>
      );

    default:
      return null;
  }
};

export default ElementsFormV2;
