import React from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import {
  InputGroupContextProvider,
  InputGroupContextConsumer,
} from "./context";
import { SIZES } from "@/utils/constant";

const InputGroup = React.forwardRef<any, any>((props, ref) => {
  const { children, className, size }: any = props;

  const { controlSize } = useConfig();
  const formControlSize = useForm()?.size;

  const inputGroupSize = size || formControlSize || controlSize;

  const inputGroupClass = classNames("flex items-center", className);

  const contextValue = {
    size: inputGroupSize,
  };
  return (
    <InputGroupContextProvider value={contextValue}>
      <InputGroupContextConsumer>
        {() => {
          return (
            <div ref={ref} className={inputGroupClass}>
              {children}
            </div>
          );
        }}
      </InputGroupContextConsumer>
    </InputGroupContextProvider>
  );
});

InputGroup.displayName = "InputGroup";

export default InputGroup;
