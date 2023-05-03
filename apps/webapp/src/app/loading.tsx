import React from "react";
import AppLogo from "@/ui/AppLogo";

export default function loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <AppLogo className="min-w-xs" />
      <div className="fz-indeterminate-progressbar mx-auto max-w-xs w-full">
        <div className="fz-indeterminate-progressbar-progress"></div>
      </div>
    </div>
  );
}
