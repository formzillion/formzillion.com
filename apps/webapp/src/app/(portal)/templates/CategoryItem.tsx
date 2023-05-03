import React from "react";
import classNames from "classnames";

export default function CategoryItem({ label, value }: any) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center mr-1">
        <input
          type="checkbox"
          id={value}
          className={classNames(
            "text-orange-600 focus:ring-orange-500 h-4 w-4 rounded border-gray-300 mr-2",
            "checked:bg-orange-700 hover:bg-gray-100"
          )}
        />
      </div>
      <label htmlFor={value} className="text-md dark:text-gray-500">
        {label}
      </label>
    </div>
  );
}
