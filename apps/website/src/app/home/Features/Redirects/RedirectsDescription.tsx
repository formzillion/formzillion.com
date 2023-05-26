export default function RedirectsDescription() {
  return (
    <div
      className={`flex justify-center items-center text-white text-left h-full`}
    >
      <div className={`relative flex items-start w-full h-full`}>
        <div className={`relative gap-6 flex flex-col items-start`}>
          <p
            className={`font-bold m-0 font-['Space_Grotesk'] text-4xl leading-[normal]`}
          >
            {"Provide an awesome after-submission experience."}
          </p>
          <p
            className={`opacity-70 text-xl font-medium leading-normal font-['Satoshi']`}
          >
            {
              "Formzillion allows you to redirect your users to a custom URL after they submit your form. Or you can use our built-in thank you page to show a custom message to your users."
            }
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/features/redirects`}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center text-white text-left font-bold w-[210px] h-[59px] bg-orange-600 font-['Satoshi'] hover:bg-orange-800"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
