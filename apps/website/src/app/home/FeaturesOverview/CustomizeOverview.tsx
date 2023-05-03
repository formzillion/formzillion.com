import Vector from "./SuccessCheckCircle";

export default function CustomizeOverview() {
  return (
    <div
      className="flex justify-center items-center w-[366px] h-[570px]"
    >
      <div
        className="pt-11 pr-5 flex flex-col items-center h-[570px] pb-[19px] pl-[22px] bg-[rgba(244,246,248,1)] gap-[34px]"
      >
        <div
          className="gap-5 flex flex-col items-center pt-0 text-center w-[309px] text-[rgba(15,25,34,1)]"
        >
          <p
            className={`font-bold w-[287px] font-['Space_Grotesk'] text-[28px] h-[72px]`}
          >
            Customize notifications
          </p>
          <p
            className={`opacity-50 text-xl font-medium leading-normal w-[309px] font-['Satoshi'] h-[90px]`}
          >
            You can easily customize both user-facing and team-facing notifications.
          </p>
        </div>
        <div className="flex justify-center items-center font-bold w-[324px]">
          <div
            className="pb-5 pr-16 relative bg-white flex flex-col items-center h-[291px] pt-[18px] pl-[65px]"
          >
            <div
              className={`relative flex justify-center items-center text-white text-left w-[170px] font-['Space_Grotesk']`}
            >
              <div className="flex justify-center items-center h-[46px]">
                <div
                  className="px-5 py-3.5 flex justify-center items-center h-[46px] bg-[rgba(40,15,44,1)]"
                >
                  <p className="text-sm h-[18px] w-[130px]">
                    Edit your  template
                  </p>
                </div>
              </div>
            </div>
            <p
              className={`relative text-center h-[142px] w-[168px] font-['Satoshi'] text-[10px] leading-[normal] text-[rgba(15,25,34,1)] mt-[60px]`}
            >
              Thank you for trying our products!!
              <br />
              <br />
              {"We received your support request, you’ll "}
              <br />
              hear from us very soon.
            </p>
            <div
              className={`py-3.5 relative flex justify-center items-center text-center pl-[47px] pr-[47px] w-[195px] bg-[rgba(255,237,230,1)] mt-[-11px] font-['Space_Grotesk'] text-[rgba(254,117,63,1)]`}
            >
              <p className="text-sm h-[18px] w-[101px]">Apply changes</p>
            </div>
            <div
              className="absolute left-1/2 top-1/2 flex flex-col items-end w-[29.47px] h-[30px] [transform:translate(calc(-50%_-_3.26px),calc(-50%_-_45.5px))]"
            >
              <Vector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}