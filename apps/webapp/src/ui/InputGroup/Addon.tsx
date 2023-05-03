import React from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import { useInputGroup } from "./context";
import { CONTROL_SIZES, SIZES } from "@/utils/constant";

const Addon = React.forwardRef<any, any>((props, ref) => {
  const { size, children, className }: any = props;

  const { controlSize } = useConfig();
  const formControlSize = useForm()?.size;
  const inputGroupSize = useInputGroup()?.size;

  const inputAddonSize =
    size || inputGroupSize || formControlSize || controlSize;

  const addonClass = classNames(
    "flex items-center px-4 rounded-md border border-gray-300 bg-gray-50",
    `input-addon-${inputAddonSize} h-${CONTROL_SIZES[inputAddonSize]}`,
    className
  );

  return (
    <div ref={ref} className={addonClass}>
      {children}
    </div>
  );
});

Addon.displayName = "InputGroupAddon";
export default Addon;
