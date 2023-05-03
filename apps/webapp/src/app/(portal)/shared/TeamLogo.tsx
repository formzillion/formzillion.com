"use client";
import React from "react";
import Popper from "@/components/Popper";
import { useSupabase } from "@/components/SupbaseProvider";

export default function TeamLogo() {
  const { session } = useSupabase();

  return (
    <div className="flex flex-row items-center space-x-3">
      <span className="dark:text-gray-200">{session?.user?.email}</span>
      <span className="dark:bg-orange-500 px-3 py-1 rounded-3xl text-sm text-gray-100">
        Pro
      </span>
      <Popper />
    </div>
  );
}
