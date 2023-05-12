import BlurDotGridTop from "./BlurDotGridTop";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function HeroSection() {
  return (
    <div className="w-full relative">
      <BlurDotGridTop />
      <HeroLeft />
      <HeroRight />
    </div>
  )
}