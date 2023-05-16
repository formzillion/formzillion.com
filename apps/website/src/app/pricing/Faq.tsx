import React from "react";
import Accordion from "@/ui/Accordion";
const faqs = [
  {
    title: "What measures do you take to ensure the security of my data?",
    description:
      "We prioritize the privacy and security of your data on Formzillion, both for our valued customers and our organization. We are committed to implementing the highest standards of security measures. You can review our Security policy by visiting this link.",
  },
  {
    title: "How do I go about upgrading my account to Agency plan?",
    description:
      "We provide three distinct subscription packages tailored to varying levels of requirements. You have the freedom to choose the package that best suits your needs, and with the convenience of your credit card, you can initiate your subscription.",
  },
  {
    title: "Is it possible to cancel my subscription plan at any time?",
    description:
      "Absolutely! There are no limitations when it comes to downgrading your account. You can effortlessly switch from any premium package to a free one or transition between different subscription plans. It's important to note that once we receive your downgrade request, you will continue to enjoy the benefits and features of your subscription package until the next billing period.",
  },
  {
    title: "How is my card information stored by you?",
    description:
      "Our services utilize the trusted payment processing services of Stripe to ensure the secure storage of your card information and seamlessly enable payment capabilities with utmost security.",
  },
  {
    title: "What happens if I surpass the monthly limit for submissions?",
    description:
      "Rest assured! Your submissions will be safely stored in a secure location until the beginning of the following month. However, in order to access them, it is necessary to upgrade your plan. By upgrading, you'll gain the ability to retrieve and view those valuable submissions!",
  },
  {
    title:
      "Is there a restriction on the number of websites or domains allowed?",
    description:
      "No, we don't restrict the number of domains or websites where form submitters can submit to each form endpoint generated on Formzillion. Therefore, you can submit through the same form endpoint from different websites without any limitations.",
  },
];
export default function Faq() {
  return (
    <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto py-8 lg:py-16">
      <h1 className="text-4xl sm:text-5xl mb-10">
        Frequently asked questions,{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          answered.
        </span>
      </h1>
      <Accordion
        items={faqs}
        type={"single"}
        collapsible={true}
        className={""}
      />
    </div>
  );
}
