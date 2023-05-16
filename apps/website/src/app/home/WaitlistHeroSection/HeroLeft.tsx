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
      <div className="mt-10 flex flex-col items-center space-y-4">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl leading-[normal]">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Open source
          </span>{" "}
          headless forms.
        </h1>
        <p className="text-base leading-normal px-12 sm:max-w-2xl">
          Instant backend for all your forms while maintaining complete control
          over their appearance and style.
        </p>
        <div>
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
            className="mt-0 flex h-[44px] w-fit items-center justify-center rounded bg-orange-600 py-2.5 px-4 text-white hover:bg-orange-700"
          >
            Get Started for free
          </Link>
        </div>
      </div>
    </div>
  );
}
