import GradientBackground from "../GradientBackground";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function HeroSection() {
  return (
    <div className="w-full relative">
      <GradientBackground />
      <HeroLeft />
      <HeroRight />
    </div>
  )
}