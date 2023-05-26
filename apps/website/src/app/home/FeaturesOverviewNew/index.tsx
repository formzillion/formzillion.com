import {
  ShieldCheckIcon,
  EnvelopeIcon,
  ShareIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import ThirdPartyApps from "./ThirdPartyApps";
import Link from "next/link";

const fertures = [
  {
    title: "Data validated, spam blocked.",
    docsUrl: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/spam-filtering`,
    subtitle:
      "Your data undergoes server-side validation, while our advanced machine learning algorithms work tirelessly to shield you from spam.",
    icon: <ShieldCheckIcon className="w-8 text-green-500" />,
  },
  {
    title: "Email notifications and automatic responses are dispatched.",
    docsUrl: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/email-notifications`,
    subtitle:
      "Responsiveness through automated email notifications and auto-responses",
    icon: <EnvelopeIcon className="w-8 text-yellow-500" />,
  },
  {
    title: "Submissions are saved to your Formzillion account.",
    docsUrl: `${process.env.NEXT_PUBLIC_DOCS_URL}/features/exports`,
    subtitle: "View submissions and export them as CSV or JSON files.",
    icon: <ListBulletIcon className="w-8" />,
  },
  {
    title: "Third party integrations come into action.",
    docsUrl: `${process.env.NEXT_PUBLIC_DOCS_URL}/integrations`,
    subtitle:
      "We eliminate the need for Zapier like application by utilizing our direct integrations to effortlessly transport your data to its intended destination.",
    icon: <ShareIcon className="w-8 text-blue-500" />,
  },
];
const FeaturesOverviewNew = () => {
  return (
    <section className="py-10 lg:max-w-4xl bg-gray-400/10 px-10 lg:px-32 rounded-2xl max-w-sm sm:max-w-xl md:max-w-2xl mx-auto mt-20 md:mt-40">
      <div className="mb-4 text-center">
        <h1 className="text-4xl mb-2 font-normal">How it works</h1>
        <p className="text-gray-400">
          Once your form is submitted using JavaScript forms or HTML forms, the
          following events occur
        </p>
      </div>
      <div className=" lg:col-span-3 mt-5">
        <div className=" space-y-5">
          {fertures.map((ferture, idx) => (
            <Link
              href={ferture.docsUrl}
              key={idx}
              target="_blank"
              rel="noreferrer"
              className="block p-2 border rounded border-gray-900 space-y-4 hover-border"
            >
              <div className="bg-black p-4 rounded relative z-10 h-full space-y-5">
                <div className=" flex space-x-5">
                  {ferture.icon}
                  <div>
                    <h2 className="text-lg my-1 font-semibold ">
                      {idx + 1}. {ferture.title}
                    </h2>
                    <p className="text-gray-400 text-sm">{ferture.subtitle}</p>
                  </div>
                </div>
                {idx === 3 ? <ThirdPartyApps /> : ""}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverviewNew;
