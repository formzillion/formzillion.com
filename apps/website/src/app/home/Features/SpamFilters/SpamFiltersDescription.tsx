export default function SpamFiltersDescription() {
  return (
    <div className={`flex flex-col justify-center text-white text-left`}>
      <p
        className={`font-bold font-['Space_Grotesk'] text-4xl leading-[normal]`}
      >
        {"Safeguard your forms from spam."}
      </p>
      <p
        className={`opacity-70 text-xl font-medium leading-normal font-['Satoshi']`}
      >
        {
          "Formzillion supports a variety of spam filters to ensure that your forms are protected from spam submissions. Just enable the filters you need and we'll take care of the rest."
        }
      </p>
      <a
        href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/features/spam-filtering`}
        target="_blank"
        rel="noreferrer"
        className="flex justify-center items-center text-white text-left font-bold w-[210px] h-[59px] bg-orange-600 font-['Satoshi'] hover:bg-orange-800"
      >
        Learn More
      </a>
    </div>
  );
}
