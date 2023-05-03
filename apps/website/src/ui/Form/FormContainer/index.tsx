import React from "react";
import classNames from "classnames";
import { FormContextProvider, FormContextConsumer } from "../context";
import { useConfig } from "../../ConfigProvider";
import { SIZES, LAYOUT } from "@/utils/constant";

const FormContainer = (props: any) => {
  const { controlSize } = useConfig();

  const {
    children,
    labelWidth = 100,
    layout = LAYOUT.VERTICAL,
    size = SIZES.MD,
    className,
  } = props;

  const contextValue = {
    labelWidth,
    layout,
    size: size || controlSize,
  };

  return (
    <FormContextProvider value={contextValue}>
      <FormContextConsumer>
        {(context: any) => {
          return (
            <div className={classNames("flex flex-col", className)}>
              {children}
            </div>
          );
        }}
      </FormContextConsumer>
    </FormContextProvider>
  );
};

export default FormContainer;
