import React from "react";
import classNames from "classnames";

const theme: any = {
  base: "group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10",
  fullSized: "w-full",
  color: {
    dark: "text-white bg-gray-900 border border-transparent hover:bg-black focus:ring-4 focus:ring-gray-300 disabled:hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 dark:border-gray-800 dark:disabled:hover:bg-gray-900",
    failure:
      "text-red-50 bg-red-700 border border-transparent hover:bg-red-800 focus:ring-4 focus:ring-red-300 disabled:hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dark:disabled:hover:bg-red-600",
    gray: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 disabled:hover:bg-white focus:ring-blue-700 focus:text-blue-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-800 focus:ring-2 dark:disabled:hover:bg-gray-900",
    info: "text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600",
    light:
      "text-gray-900 bg-white bw-order border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-white dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:border-gray-800 dark:focus:ring-gray-700",
    purple:
      "text-white bg-purple-700 border border-transparent hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 disabled:hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 dark:disabled:hover:bg-purple-600",
    orange:
      "text-white bg-orange-700 border border-transparent hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 disabled:hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900 dark:disabled:hover:bg-orange-600",
    success:
      "text-white bg-green-700 border border-transparent hover:bg-green-800 focus:ring-4 focus:ring-green-300 disabled:hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 dark:disabled:hover:bg-green-600",
    warning:
      "text-white bg-yellow-400 border border-transparent hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 disabled:hover:bg-yellow-400 dark:focus:ring-yellow-900 dark:disabled:hover:bg-yellow-400",
  },
  disabled: "cursor-not-allowed opacity-50",
  inner: {
    base: "flex items-center",
    position: {
      none: "",
      start: "rounded-r-none",
      middle: "!rounded-none",
      end: "rounded-l-none",
    },
    outline: "border border-transparent",
  },
  label:
    "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800",
  outline: {
    color: {
      gray: "border border-gray-900 dark:border-white",
      default: "border-0",
      light: "",
    },
    off: "",
    on: "bg-white text-gray-900 transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit dark:bg-black dark:text-white",
    pill: {
      off: "rounded-md",
      on: "rounded-full",
    },
  },
  pill: {
    off: "rounded-md",
    on: "rounded-full",
  },
  size: {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
    xl: "text-base px-6 py-3",
  },
};

export default function ZsButton(props: any) {
  const {
    children,
    color = "orange",
    disabled = false,
    gradientDuoTone,
    gradientMonochrome,
    href,
    label,
    outline = false,
    pill = false,
    fullSized,
    positionInGroup = "none",
    size = "md",
    className,
    ...otherProps
  } = props;
  const isLink = typeof href !== "undefined";
  const Component = isLink ? "a" : "button";

  return (
    <Component
      className={classNames(
        disabled && theme.disabled,
        !gradientDuoTone && !gradientMonochrome && theme.color[color],
        gradientDuoTone &&
          !gradientMonochrome &&
          theme.gradientDuoTone[gradientDuoTone],
        !gradientDuoTone &&
          gradientMonochrome &&
          theme.gradient[gradientMonochrome],
        outline && (theme.outline.color[color] ?? theme.outline.color.default),
        theme.base,
        theme.pill[pill ? "on" : "off"],
        fullSized && theme.fullSized,
        className
      )}
      disabled={disabled}
      href={href}
      type={isLink ? undefined : "button"}
      {...otherProps}
    >
      <span
        className={classNames(
          theme.inner.base,
          theme.inner.position[positionInGroup],
          theme.outline[outline ? "on" : "off"],
          theme.outline.pill[outline && pill ? "on" : "off"],
          theme.size[size],
          outline && !theme.outline.color[color] && theme.inner.outline
        )}
      >
        <>
          {typeof children !== "undefined" && children}
          {typeof label !== "undefined" && (
            <span className={theme.label} data-testid="wb-button-label">
              {label}
            </span>
          )}
        </>
      </span>
    </Component>
  );
}
