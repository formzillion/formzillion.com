import clsx from "clsx";
import FeatureDescription from "./FeatureDescription";

export default function FeatureSection({
  className,
  title,
  description,
  action,
  illustration,
  reverse
}: {
  className?: string;
  title: string;
  description: string;
  action?: string;
  illustration: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={clsx("w-full max-w-7xl mt-40 mx-auto", className)}>
      <div className={clsx("flex z-20", reverse ? "flex-wrap-reverse" : "flex-wrap", reverse ? "flex-row-reverse" : "flex-row", "justify-center")}>
        <div className="basis-1 md:basis-1/2">
          {illustration}
        </div>
        <div className="basis-1 md:basis-1/2">
          <FeatureDescription
            title={title}
            description={description}
            action={action}
          />
        </div>
      </div>
    </div>
  )
}