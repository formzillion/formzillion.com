import React from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "../context";
import { useConfig } from "../../ConfigProvider";
import { CONTROL_SIZES, SIZES, LAYOUT } from "@/utils/constant";

const FormItem = React.forwardRef<any, any>((props, ref) => {
  const {
    children,
    label,
    labelClass,
    errorMessage,
    invalid,
    className,
    layout,
    labelWidth,
    asterisk,
    style,
    size,
    extra,
    htmlFor,
  }: any = props;

  const formContext: any = useForm();
  const { controlSize } = useConfig();

  const formItemLabelHeight = size || formContext.size || controlSize;
  const formItemLabelWidth = labelWidth || formContext.labelWidth;
  const formItemLayout = layout || formContext.layout;

  const getFormLabelLayoutClass = () => {
    switch (formItemLayout) {
      case LAYOUT.HORIZONTAL:
        return label
          ? `h-${CONTROL_SIZES[formItemLabelHeight]} ${label && "pr-2"}`
          : "pr-2";
      case LAYOUT.VERTICAL:
        return `mb-2`;
      case LAYOUT.INLINE:
        return `h-${CONTROL_SIZES[formItemLabelHeight]} ${label && "pr-2"}`;
      default:
        break;
    }
  };

  const formItemClass = classNames(
    "mb-7 relative",
    formItemLayout,
    className,
    invalid ? "text-red-500" : ""
  );

  const formLabelClass = classNames(
    "flex items-center font-semibold",
    label && getFormLabelLayoutClass(),
    labelClass
  );

  const formLabelStyle = () => {
    if (formItemLayout === LAYOUT.HORIZONTAL) {
      return { ...style, ...{ minWidth: formItemLabelWidth } };
    }

    return { ...style };
  };

  const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 };
  const exitStyle = { opacity: 0, marginTop: -10 };
  const initialStyle = exitStyle;

  return (
    <div ref={ref} className={formItemClass}>
      <label
        htmlFor={htmlFor}
        className={formLabelClass}
        style={formLabelStyle()}
      >
        {asterisk && <span className="text-red-500 mr-1">*</span>}
        {label}
        {extra && <span>{extra}</span>}
        {label && formItemLayout !== "flex flex-col" && ":"}
      </label>
      <div
        className={
          formItemLayout === LAYOUT.HORIZONTAL
            ? "w-full flex flex-col justify-center relative"
            : ""
        }
      >
        {children}
        <AnimatePresence mode="wait">
          {invalid && (
            <motion.div
              className="text-red-500 absolute"
              initial={initialStyle}
              animate={enterStyle}
              exit={exitStyle}
              transition={{ duration: 0.15, type: "tween" }}
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

FormItem.displayName = "FormItem";

export default FormItem;
