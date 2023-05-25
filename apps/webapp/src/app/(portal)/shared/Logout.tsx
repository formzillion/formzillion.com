"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/components/SupbaseProvider";
import { DropdownMenuItem } from "@/ui/DropdownMenu";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function Logout() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const onClickLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    sessionStorage.clear();
  };

  return (
    <DropdownMenuItem onClick={onClickLogout} className="cursor-pointer border-t border-gray-300 rounded-none">
      <ArrowRightCircleIcon className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-500" />
      Logout
    </DropdownMenuItem>
  );
}
