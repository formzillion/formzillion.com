export default function IntegrationsOverview() {
  return (
    <div
      className="flex justify-center items-center w-[366px] h-[570px]"
    >
      <div className="pt-11 flex flex-col items-center pl-[21px] pr-[21px] h-[570px] pb-[19px] bg-[rgba(244,246,248,1)] gap-[34px]">
        <div className="gap-5 flex flex-col items-center pt-0 text-center w-[309px] text-[rgba(15,25,34,1)]">
          <p
            className={`font-bold w-[287px] font-['Space_Grotesk'] text-[28px] h-[72px]`}
          >
            Power up through integrations
          </p>
          <p
            className={`opacity-50 text-xl font-medium leading-normal w-[309px] font-['Satoshi'] h-[90px]`}
          >
            Keep your data in sync with any platform you utilize using our 20+
            integrations.
          </p>
        </div>
        <div className="flex justify-center items-center font-bold w-[324px]">
          <div className="pl-16 relative bg-white flex flex-col items-center h-[291px] pt-[88px] pb-[22px] pr-[65px]">
            <div className="w-10 h-10 relative [background:url(https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/85f71a76ba3ba09c52ab3fb2dd05a70ab645594b.webp)_center_/_cover]" />
            <div
              className={`relative text-center leading-none mt-2 h-[142px] w-[104px] font-['Satoshi']`}
            >
              <p className="inline m-0 text-[10px] leading-[normal] text-[rgba(15,25,34,1)]">
                {"Notify my team Slack on "}
              </p>
              <p className="inline m-0 text-[10px] leading-[normal] text-[rgba(40,15,44,1)]">
                #notifications
              </p>
              <p className="inline m-0 text-[10px] leading-[normal] text-[rgba(15,25,34,1)]">
                {" channel whenever this form receives a new submission"}
              </p>
            </div>
            <div
              className={`py-3.5 relative flex justify-center items-center text-center pl-[68.5px] pr-[68.5px] w-[195px] bg-[rgba(255,237,230,1)] mt-[-19px] font-['Space_Grotesk'] text-[rgba(254,117,63,1)]`}
            >
              <p className="text-sm h-[18px] w-[58px]">Connect</p>
            </div>
            <div
              className={`absolute left-1/2 top-1/2 flex flex-col items-end text-left text-white w-[123px] h-[46px] font-['Space_Grotesk'] [transform:translate(calc(-50%_+_7.5px),calc(-50%_-_104.5px))]`}
            >
              <div className="flex justify-center items-center w-[123px]">
                <div className="px-5 py-3.5 flex justify-center items-center h-[46px] bg-[rgba(40,15,44,1)]">
                  <p className="text-sm h-[18px] w-[83px]">Integrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}