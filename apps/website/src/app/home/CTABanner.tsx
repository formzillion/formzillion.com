import BlurDotGridBottom from "./WaitlistHeroSection/BlurDotGridBottom";

export default function CTABanner() {
  return (
    <div className="relative flex flex-col justify-center content-center mx-auto items-center max-w-7xl rounded-md text-center bg-[url('/pattern_bw.svg')] bg-blend-darken bg-opacity-10 mt-40 mb-20">
      <div className="w-full h-full flex flex-col py-20 px-20 justify-center items-center backdrop-brightness-50">
        <p className="justify-center items-center w-full font-bold font-['Space_Grotesk'] text-5xl leading-[normal] text-white text-center">
          Join our waitlist now, and get early access to our platform.
        </p>

        <form action="https://app.formzillion.com/f/clgyyjgc80003l0084t5yhw5h" method="POST" className="flex flex-row items-center gap-1 mt-10">
          <input type="email" className="w-[420px] h-[60px] border-2 border-slate-300 bg-black px-4 py-2 text-slate-100 leading-tight focus:outline-none focus:border-orange-500" placeholder="Enter your email" name="email" />
          <button type="submit" className="flex justify-center items-center text-white text-left font-bold w-[210px] h-[60px] bg-orange-600 font-['Satoshi'] hover:bg-orange-800">
            Request Access
          </button>
        </form>
      </div>
    </div>
  )
}