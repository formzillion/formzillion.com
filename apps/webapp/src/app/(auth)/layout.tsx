import Showcase from "./showcase";

interface IProps {
  children: React.ReactNode;
}

export default async function UnAuthLayout({ children }: IProps) {
  return (
    <div className="flex h-screen w-screen justify-between dark:bg-black max-w-7xl mx-auto">
      <div className="hidden h-full min-w-1/2 w-1/2 flex-col justify-center p-12 lg:flex pl-32">
        <Showcase />
      </div>
      <div className="flex h-full w-full grow items-center justify-center p-4">
        <div className="flex min-h-[430px] w-full max-w-xl flex-col justify-between rounded-lg ">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
