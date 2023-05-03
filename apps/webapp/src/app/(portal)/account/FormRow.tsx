import React from "react";
import classNames from "classnames";
import FormItem from "@/ui/Form/FormItem";

const FormRow = (props: any) => {
  const {
    label,
    children,
    errors = {},
    touched,
    name,
    border = true,
    alignCenter = true,
  } = props;

  return (
    <div
      className={classNames(
        "grid gap-4 py-8 md:grid-cols-3",
        border && "border-b border-gray-200",
        alignCenter && "items-center"
      )}
    >
      <div className="font-semibold">{label}</div>
      <div className="col-span-2">
        <FormItem
          className="mb-0 max-w-[700px]"
          invalid={errors[name] && touched[name]}
          errorMessage={errors[name]}
        >
          {children}
        </FormItem>
      </div>
    </div>
  );
};

export default FormRow;
