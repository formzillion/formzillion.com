import Image from "next/image";
import {
  ShieldCheckIcon,
  EnvelopeIcon,
  ShareIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import formExaple from "public/screenshots/formExample.png";
import ThirdPartyApps from "./ThirdPartyApps";
import DotGrid from "../FeaturesOverview/DotGrid";
import DotGridBottom from "../FeaturesOverview/DotGridBottom";

const fertures = [
  {
    title: "Data validated, spam blocked.",
    subtitle:
      "Your data undergoes server-side validation, while our advanced machine learning algorithms work tirelessly to shield you from spam.",
    icon: <ShieldCheckIcon className="w-8" />,
  },
  {
    title: "Email notifications and automatic responses are dispatched.",
    subtitle:
      "Responsiveness through Automated Email Notifications and Auto-Responses",
    icon: <EnvelopeIcon className="w-8 " />,
  },
  {
    title: "Submissions are saved to the to your Formzillion account.",
    subtitle: "View submissions and export them as CSV or JSON files.",
    icon: <ListBulletIcon className="w-8" />,
  },
  {
    title: "3rd party integrations come into action.",
    subtitle:
      "We eliminate the need for Zapier like application by utilizing our direct integrations to effortlessly transport your data to its intended destination.",
    icon: <ShareIcon className="w-8" />,
  },
];
const FeaturesOverviewNew = () => {
  return (
    <section className="py-16 max-w-6xl mx-auto">
      <div className="mb-4 text-center">
        <h1 className="text-4xl mb-2">
          Here’s how we make your work a breeze...
        </h1>
        <p className="text-gray-400">
          Once your form is submitted using JavaScript forms or HTML forms, the
          following events occur
        </p>
      </div>
      <div className=" grid grid-cols-5 relative mt-5 gap-5">
        <div className=" col-span-2">
          <div className=" flex justify-center items-center  bg-gradient-to-b from-black to-gray-950 border border-gray-500 rounded w-full h-full">
            <Image src={formExaple} alt={"formExaple"} className="" />
          </div>
        </div>
        <div className="pr-16 col-span-3">
          <div className="grid grid-cols-2 gap-5">
            {fertures.map((ferture, idx) => (
              <div
                key={idx}
                className="p-2 border rounded border-gray-500 space-y-4 hover-border"
              >
                <div className="bg-black px-4 py-8 rounded relative z-10 h-full p-4">
                  {ferture.icon}
                  <div>
                    <h2 className="text-lg my-1 ">{ferture.title}</h2>
                    <p className="text-gray-400 text-sm">{ferture.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ThirdPartyApps />
    </section>
  );
};

export default FeaturesOverviewNew;
