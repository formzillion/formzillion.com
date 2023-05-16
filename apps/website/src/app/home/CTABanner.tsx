import Link from "next/link";

export default function CTABanner() {
  return (
    <div className="relative flex flex-col justify-center content-center mx-auto items-center max-w-7xl rounded-md text-center bg-[url('/pattern_bw.svg')] bg-blend-darken bg-opacity-10 lg:mt-40 lg:mb-20">
      <div className="w-full h-full flex flex-col py-20 px-10 sm:px-20 justify-center items-center backdrop-brightness-50">
        <p className="justify-center items-center w-full font-bold text-xl sm:text-3xl lg:text-5xl leading-[normal] text-white text-center">
          Join our waitlist now, and get early access to our platform.
        </p>
        <div className="mt-8">
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
            className="mt-0 flex items-center justify-center rounded bg-orange-600 py-2 px-4 text-white hover:bg-orange-700"
          >
            Get Started for free
          </Link>
        </div>
      </div>
    </div>
  );
}
