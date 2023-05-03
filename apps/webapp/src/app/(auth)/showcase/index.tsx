import React from "react";
import Carousel from "@/components/Carousel";
import Overview from "./Overview";
import BlurDotGridTop from "./BlurDotGridTop";

import Steps from "./Steps";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

export default function Showcase() {
  return (
    <>
      <BlurDotGridTop />
      <Carousel
        slides={[
          <Overview
            title="3 easy steps to get started"
            description="Formzillion is a no/low-code form builder that helps you create forms and collect leads."
            illustration={<Steps />}
          />,
          <Overview
            title="1. Seamlessly create form endpoints"
            description="Form endpoints work out-of-the-box, so with just a click, you can create a fully-functional backend."
            illustration={<StepOne />}
          />,
          <Overview
            title="2. Customize notifications"
            description="You can easily customize both user-facing and team-facing notifications."
            illustration={<StepTwo />}
          />,
          <Overview
            title="3. Power up through integrations"
            description="Keep your data in sync with any platform you utilize using our 20+ integrations."
            illustration={<StepThree />}
          />,
        ]}
      />
    </>
  );
}
