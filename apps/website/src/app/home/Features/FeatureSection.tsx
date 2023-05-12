import clsx from "clsx";
import FeatureDescription from "./FeatureDescription";

export default function FeatureSection({
  className,
  title,
  description,
  action,
  illustration,
  reverse,
}: {
  className?: string;
  title: string;
  description: string;
  action?: string;
  illustration: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={clsx(
        "w-full lg:max-w-3xl xl:max-w-7xl max-w-xs sm:max-w-md md:max-w-2xl border border-gray-900 rounded-xl p-5 xl:p-0 lg:border-none my-5 lg:mt-8 mx-auto",
        className
      )}
    >
      <div
        className={clsx(
          "lg:flex items-center z-20",
          reverse ? "flex-wrap-reverse" : "flex-wrap",
          reverse ? "flex-row-reverse" : "flex-row",
          "justify-center"
        )}
      >
        <div className="basis-1 md:basis-1/2">{illustration}</div>
        <div className="basis-1 md:basis-1/2">
          <FeatureDescription
            title={title}
            description={description}
            action={action}
          />
        </div>
      </div>
    </div>
  );
}
