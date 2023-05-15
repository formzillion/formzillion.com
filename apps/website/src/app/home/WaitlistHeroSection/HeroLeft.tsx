import Link from "next/link";

interface BadgeProps {
  title: string;
}
const Badge = (props: BadgeProps) => {
  const { title } = props;
  return (
    <span className="bg-orange-600 rounded-full px-3 text-xs  text-white py-0.5 mx-1">
      {title}
    </span>
  );
};

export default function HeroLeft() {
  return (
    <div className="flex relative justify-center items-center text-white text-center w-full h-full mx-auto max-w-6xl">
      <div className="flex items-start w-full h-full mt-10 sm:mt-16">
        <div className="gap-6 flex flex-col items-center">
          <h1 className="font-bold m-0 py-4 text-2xl sm:text-3xl lg:text-5xl leading-[normal]">
            Open source headless forms.
          </h1>
          <p className="text-base sm:text-xl leading-normal px-12 sm:px-28">
            Instant backend for all your forms while maintaining complete
            control over their appearance and style.
          </p>
          <div>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
              className="mt-0 flex h-[44px] items-center justify-center rounded bg-orange-600 py-2.5 px-4 text-white hover:bg-orange-700"
            >
              Get Started for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
