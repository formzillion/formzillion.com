import React from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { CgSpinner } from "react-icons/cg";

const Spinner = React.forwardRef<any, any>((props, ref) => {
  const {
    className,
    color,
    enableTheme,
    indicator: Component,
    isSpining,
    size,
    style,
    ...rest
  }: any = props;

  const { themeColor, primaryColorLevel } = useConfig();

  const spinnerColor =
    color || (enableTheme && `${themeColor}-${primaryColorLevel}`);

  const spinnerStyle = {
    height: size,
    width: size,
    ...style,
  };

  const spinnerClass = classNames(
    isSpining && "animate-spin",
    spinnerColor && `text-${spinnerColor}`,
    className
  );

  return (
    <Component
      ref={ref}
      style={spinnerStyle}
      className={spinnerClass}
      {...rest}
    />
  );
});

Spinner.displayName = "Spinner";

export default Spinner;
