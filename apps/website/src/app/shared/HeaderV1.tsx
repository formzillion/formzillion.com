import Link from "next/link";
import AppLogo from "@/ui/AppLogo";

export function Header() {
  return (
    <>
      <header className="absolute w-full top-0">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className="pointer-events-none absolute inset-0 z-30"
            aria-hidden="true"
          />
          <div className="relative z-20">
            <div className="mx-auto py-4 flex items-center justify-between md:justify-start md:space-x-10 lg:px-8">
              <div>
                <AppLogo />
              </div>
              <div className="hidden md:flex md:flex-1 md:items-center md:justify-between pt-3 pl-20">
                <nav className="flex space-x-10">
                  <Link
                    href="/pricing"
                    className="text-lg font-[satoshi] font-medium text-gray-200 hover:text-orange-500"
                  >
                    Pricing
                  </Link>
                  {/* <Link
                    href="/templates"
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Templates
                  </Link> */}
                  <Link
                    href={`${process.env.NEXT_PUBLIC_DOCS_URL}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-[satoshi] font-medium text-gray-200 hover:text-orange-500"
                  >
                    Docs
                  </Link>
                </nav>
                <div className="flex items-center md:ml-12">
                  <Link
                    href="/login"
                    className="border-orange-600 border-2 flex justify-center items-center text-left font-bold w-[116px] h-[59px] font-['Satoshi'] text-white hover:bg-orange-800 hover:border-orange-800"
                  >
                    Sign in
                  </Link>
                  <a
                    href="https://rkq53epk2c1.typeform.com/to/oflWmqo6"
                    className="ml-2 flex justify-center items-center text-white text-left font-bold w-[210px] h-[59px] bg-orange-600 font-['Satoshi'] hover:bg-orange-800"
                  >
                    Request Access
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
