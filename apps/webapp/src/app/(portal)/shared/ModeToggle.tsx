"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/ui/Buttons/SButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { HomeIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const icon =
    theme === "light" ? (
      <SunIcon className="h-4 w-4" />
    ) : theme === "dark" ? (
      <MoonIcon className="h-4 w-4" />
    ) : (
      <SunIcon className="h-4 w-4" />
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-8 px-0 flex justify-center"
        >
          {icon}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <HomeIcon className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
