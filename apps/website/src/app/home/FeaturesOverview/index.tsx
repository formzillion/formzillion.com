import OverviewCard from "./OverviewCard";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import DotGrid from "./DotGrid";
import DotGridBottom from "./DotGridBottom";

export default function FeaturesOverview() {
  return (
    <div className="flex justify-center items-center w-full mt-10 max-w-7xl mx-auto">
      <div className="relative flex flex-col items-center">
        <div className="text-center font-bold font-['Space_Grotesk'] text-white text-5xl max-w-4xl pt-20 pb-10">
          Here’s how we make your work a breeze...
        </div>
        <div className="flex z-20 gap-10 flex-wrap flex-row justify-center">
          <div className="basis-1/3 md:basis-1">
            <OverviewCard
              title="1. Seamlessly create form endpoints"
              description="Form endpoints work out-of-the-box, so with just a click, you can create a fully-functional backend."
              illustration={<StepOne />}
            />
          </div>
          <div className="basis-1/3 md:basis-1">
            <OverviewCard
              title="2. Customize notifications"
              description="You can easily customize both user-facing and team-facing notifications."
              illustration={<StepTwo />}
            />
          </div>
          <div className="basis-1/3 md:basis-1">
            <OverviewCard
              title="3. Power up through integrations"
              description="Keep your data in sync with any platform you utilize using our 20+ integrations."
              illustration={<StepThree />}
            />
          </div>
        </div>
        <DotGrid className="absolute top-0 right-0" rows={10} cols={10} />
        <DotGridBottom />
      </div>
    </div>
  );
}
