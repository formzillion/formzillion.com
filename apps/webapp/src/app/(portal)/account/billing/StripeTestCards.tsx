const StripeTestCards = () => {
  return (
    <div className="py-2 my-3">
      Use any of the{" "}
      <a
        href="https://stripe.com/docs/testing#cards"
        target="_blank"
        rel="noopener noreferrer"
      >
        Stripe test cards
      </a>{" "}
      for this demo, e.g.{" "}
      <span className="card-number">
        4242<span></span>4242<span></span>4242<span></span>4242
      </span>
    </div>
  );
};

export default StripeTestCards;
