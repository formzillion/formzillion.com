import classNames from "classnames";
import type { InputHTMLAttributes } from "react";
import React, { forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  description: string;
  descriptionAsLabel?: boolean;
  informationIconText?: string;
  error?: boolean;
  className?: string;
};

const CheckboxField = forwardRef<HTMLInputElement, Props>(
  ({ label, description, error, disabled, ...rest }, ref) => {
    const descriptionAsLabel = !label || rest.descriptionAsLabel;
    return (
      <div className="block items-center sm:flex">
        {label && (
          <div className="min-w-48 mb-4 sm:mb-0">
            {React.createElement(
              descriptionAsLabel ? "div" : "label",
              {
                className: classNames("flex text-sm font-medium text-gray-900"),
                ...(!descriptionAsLabel
                  ? {
                      htmlFor: rest.id,
                    }
                  : {}),
              },
              label
            )}
          </div>
        )}
        <div className="w-full">
          <div className="relative flex items-start">
            {React.createElement(
              descriptionAsLabel ? "label" : "div",
              {
                className: classNames(
                  "relative flex items-start",
                  !error && descriptionAsLabel
                    ? "text-gray-900"
                    : "text-gray-900",
                  error && "text-red-800"
                ),
              },
              <>
                <div className="flex h-5 items-center mr-1">
                  <input
                    {...rest}
                    ref={ref}
                    type="checkbox"
                    disabled={disabled}
                    className={classNames(
                      "text-orange-600 focus:ring-orange-500 h-4 w-4 rounded border-gray-300 mr-2",
                      !error && disabled
                        ? "bg-gray-300 checked:bg-gray-300"
                        : "checked:bg-orange-700 hover:bg-gray-100",
                      error &&
                        "border-red-800 checked:bg-red-800 hover:bg-red-400",
                      rest.className
                    )}
                  />
                </div>
                <span className="text-sm">{description}</span>
              </>
            )}
            {/* {informationIconText && <InfoBadge content={informationIconText}></InfoBadge>} */}
          </div>
        </div>
      </div>
    );
  }
);

CheckboxField.displayName = "CheckboxField";

export default CheckboxField;
