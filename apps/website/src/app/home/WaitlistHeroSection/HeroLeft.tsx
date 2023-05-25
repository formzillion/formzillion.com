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
        <h1 className="font-normal text-2xl sm:text-3xl lg:text-5xl max-w-6xl">
          The open-source{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            form infrastructure
          </span>{" "}
          for everyone
        </h1>
        <p className="text-base lg:text-xl leading-normal px-12 sm:max-w-3xl font-light text-gray-300">
          Instant backend for all your forms while maintaining complete control
          over their appearance and style.
        </p>
        <div className="flex space-x-5">
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/login`}
            className="mt-0 flex h-[44px] w-fit items-center justify-center rounded bg-orange-600 py-2.5 px-4 text-white hover:bg-orange-700"
          >
            {`Try Formzillion - It's free!`}
          </Link>
          <Link
            href={`/demo`}
            className="mt-0 flex h-[44px] w-fit items-center justify-center rounded border border-orange-600 py-2.5 px-4 hover:text-white hover:bg-orange-600 text-orange-600"
          >
            {`Try Demo`}
          </Link>
        </div>
      </div>
    </div>
  );
}
