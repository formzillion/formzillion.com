import EllipseBlur from "./EllipseBlur";
import HeroRight from "./HeroRight";

export default function HeroLeft() {
  return (
    <div
      className={`flex relative justify-center items-center text-white text-center w-full h-full mx-auto`}
    >
      <div
        className={`flex items-start w-full h-full mt-40`}
      >
        <div
          className={`gap-6 flex flex-col items-center`}
        >
          <p
            className={`font-bold m-0 font-['Space_Grotesk'] text-6xl leading-[normal]`}
          >
            {"Instant backend for all your forms."}
          </p>
          <p
            className={`opacity-70 text-xl font-medium leading-normal font-['Satoshi']`}
          >
            {
              "Retain full control over the look and feel of your forms. Let us handle the rest, including scaling, security, integrations, collaboration and automations."
            }
          </p>
          <form action="https://app.formzillion.com/f/clgyyjgc80003l0084t5yhw5h" method="POST" className="flex flex-row items-center gap-1">
            <input type="email" className="w-[420px] h-[60px] border-2 border-gray-600 bg-black px-4 py-2 text-slate-100 leading-tight focus:outline-none focus:border-orange-500" placeholder="Enter your email" name="email" />
            <button type="submit" className="flex justify-center items-center text-white text-left font-bold w-[210px] h-[60px] bg-orange-600 font-['Satoshi'] hover:bg-orange-800">
              Request Access
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
