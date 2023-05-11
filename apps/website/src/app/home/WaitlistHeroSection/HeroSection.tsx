import BlurDotGridTop from "./BlurDotGridTop";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function HeroSection() {
  return (
    <div className="flex justify-center items-center w-full flex-row flex-wrap max-w-7xl mx-auto relative">
      <BlurDotGridTop />
      <HeroLeft />
      <HeroRight />
    </div>
  )
}