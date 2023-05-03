import React, { useState, useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import { useInputGroup } from "../InputGroup/context";
import { CONTROL_SIZES, SIZES } from "@/utils/constant";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import get from "lodash/get";

const Input = React.forwardRef<any, any>((props, ref) => {
  const {
    asElement: Component,
    className,
    disabled,
    invalid,
    prefix,
    size,
    suffix,
    textArea,
    type,
    style,
    unstyle,
    field,
    form,
    ...rest
  }: any = props;

  const [prefixGutter, setPrefixGutter] = useState(0);
  const [suffixGutter, setSuffixGutter] = useState(0);

  const { themeColor, controlSize, primaryColorLevel, direction } = useConfig();
  const formControlSize = useForm()?.size;
  const inputGroupSize = useInputGroup()?.size;

  const inputSize = size || inputGroupSize || formControlSize || controlSize;

  const fixControlledValue = (val: any) => {
    if (typeof val === "undefined" || val === null) {
      return "";
    }
    return val;
  };

  if ("value" in props) {
    rest.value = fixControlledValue(props.value);
    delete rest.defaultValue;
  }

  const isInvalid = useMemo(() => {
    let validate = false;
    if (!isEmpty(form)) {
      const { touched, errors } = form;
      const touchedField = get(touched, field.name);
      const errorField = get(errors, field.name);
      validate = touchedField && errorField;
    }
    if (typeof invalid === "boolean") {
      validate = invalid;
    }
    return validate;
  }, [form, invalid, field]);

  const inputDefaultClass =
    "border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-1 focus-within:ring-1 appearance-none transition duration-150 ease-in-out";
  const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`;
  const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`;
  const inputWrapperClass = `relative w-full flex ${
    prefix || suffix ? className : ""
  }`;
  const inputClass = classNames(
    inputDefaultClass,
    !textArea && inputSizeClass,
    !isInvalid && inputFocusClass,
    !prefix && !suffix ? className : "",
    disabled && "bg-gray-100 text-gray-400 cursor-not-allowed",
    isInvalid && "ring-1 ring-red-500 border-red-500",
    textArea && "min-h-[7px]"
  );

  const prefixNode: any = useRef();
  const suffixNode: any = useRef();

  const getAffixSize = () => {
    if (!prefixNode.current && !suffixNode.current) {
      return;
    }
    const prefixNodeWidth = prefixNode?.current?.offsetWidth;
    const suffixNodeWidth = suffixNode?.current?.offsetWidth;

    if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
      return;
    }

    if (prefixNodeWidth) {
      setPrefixGutter(prefixNodeWidth);
    }

    if (suffixNodeWidth) {
      setSuffixGutter(suffixNodeWidth);
    }
  };

  useEffect(() => {
    getAffixSize();
  }, [prefix, suffix]);

  const remToPxConvertion = (pixel: any) => 0.0625 * pixel;

  const affixGutterStyle = () => {
    const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`;
    const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`;
    let gutterStyle: any = {};

    if (direction === "ltr") {
      if (prefix) {
        gutterStyle.paddingLeft = leftGutter;
      }

      if (suffix) {
        gutterStyle.paddingRight = rightGutter;
      }
    }

    if (direction === "rtl") {
      if (prefix) {
        gutterStyle.paddingRight = leftGutter;
      }

      if (suffix) {
        gutterStyle.paddingLeft = rightGutter;
      }
    }

    return gutterStyle;
  };

  const inputProps = {
    className: !unstyle ? inputClass : "",
    disabled,
    type,
    ref,
    ...field,
    ...rest,
  };

  const renderTextArea = <textarea style={style} {...inputProps}></textarea>;

  const renderInput = (
    <Component style={{ ...affixGutterStyle(), ...style }} {...inputProps} />
  );

  const renderAffixInput = (
    <span className={inputWrapperClass}>
      {prefix ? (
        <div
          className="absolute top-2/4 transform -translate-y-2/4 left-2.5"
          ref={(node) => (prefixNode.current = node)}
        >
          {" "}
          {prefix}{" "}
        </div>
      ) : null}
      {renderInput}
      {suffix ? (
        <div
          className="absolute top-2/4 transform -translate-y-2/4 right-2.5 flex"
          ref={(node) => (suffixNode.current = node)}
        >
          {suffix}
        </div>
      ) : null}
    </span>
  );

  const renderChildren = () => {
    if (textArea) {
      return renderTextArea;
    }

    if (prefix || suffix) {
      return renderAffixInput;
    } else {
      return renderInput;
    }
  };

  return renderChildren();
});

Input.displayName = "Input";

export default Input;
