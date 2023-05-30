"use client";
import React from "react";
import { Switch } from "@headlessui/react";
import classNames from "classnames";

interface ISwitchGroup {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  showSwitch?: boolean;
  plan?: any;
}

export default function SwitchGroup({
  label,
  description,
  checked,
  onChange,
  showSwitch = true,
  plan,
}: ISwitchGroup) {
  return (
    <Switch.Group as="li" className="flex items-center justify-between py-4">
      <div className="flex flex-col">
        <Switch.Label
          as="p"
          className="text-sm font-medium text-gray-900 dark:text-white flex"
          passive
        >
          {label}
          {plan ? plan : ""}
        </Switch.Label>
        <Switch.Description className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </Switch.Description>
      </div>
      {showSwitch && (
        <Switch
          checked={checked}
          onChange={onChange}
          className={classNames(
            checked ? "bg-orange-500" : "bg-gray-200",
            "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              checked ? "translate-x-5" : "translate-x-0",
              "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
      )}
    </Switch.Group>
  );
}

export function SwitchButton({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: any;
}) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={classNames(
        checked ? "bg-orange-500" : "bg-gray-200",
        "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      )}
    >
      <span
        aria-hidden="true"
        className={classNames(
          checked ? "translate-x-5" : "translate-x-0",
          "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  );
}
