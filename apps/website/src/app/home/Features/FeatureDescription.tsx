import clsx from "clsx";

export default function FeatureDescription({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-center text-white text-left h-full gap-5 relative",
        className
      )}
    >
      <p className="font-bold text-xl lg:text-3xl xl:text-4xl leading-[normal]">
        {title}
      </p>
      <p className="opacity-70 text-sm lg:text-lg xl:text-xl leading-normal">
        {description}
      </p>
      {action && (
        <div className="h-full">
          <a
            href={action}
            className=" flex justify-center items-center text-white text-sm md:text-lg xl:text-xl text-left w-[150px] h-[40px] md:w-[180px] md:h-[50px] xl:w-[210px] xl:h-[60px] bg-orange-600 hover:bg-orange-800"
          >
            Learn More
          </a>
        </div>
      )}
    </div>
  );
}
