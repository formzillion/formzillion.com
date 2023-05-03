import clsx from "clsx";

export default function FeatureDescription({
  title,
  description,
  action,
  className
}: {
  title: string;
  description: string;
  action?: string,
  className?: string,
}) {
  return (
    <div
      className={clsx("flex flex-col justify-center text-white text-left h-full gap-5", className)}
    >

      <p className="font-bold font-['Space_Grotesk'] text-4xl leading-[normal]">
        {
          title
        }
      </p >
      <p className="opacity-70 text-xl font-medium leading-normal font-['Satoshi']">
        {
          description
        }
      </p>
      {
        action && (
          <a
            href={action}
            className="flex justify-center items-center text-white text-left font-bold w-[210px] h-[60px] bg-orange-600 font-['Satoshi'] hover:bg-orange-800"
          >
            Learn More
          </a>
        )
      }
    </div >
  );
}
