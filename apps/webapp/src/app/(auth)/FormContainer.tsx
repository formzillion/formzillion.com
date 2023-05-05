import React from "react";
import AppLogo from "@/ui/AppLogo";

interface FormLayoutProps {
  title: string;
  subtitle: string;
  children?: React.ReactElement;
}

export default function FormContainer(props: FormLayoutProps) {
  const { title, subtitle } = props;
  return (
    <div className="relative flex min-h-full flex-col py-12 sm:px-6 lg:px-8 z-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <AppLogo className="justify-center" />
        <h2 className="mt-6 text-center text-3xl tracking-tight text-gray-600 dark:text-gray-300 font-['Space_Grotesk']">
          {title}
        </h2>
        <div className="mt-5 text-center text-base text-gray-500 font-[Satoshi]">
          <p>{subtitle}</p>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-lg font-[Satoshi] py-8 px-4 sm:px-10">
          {props.children}
        </div>
      </div>
    </div>
  );
}
