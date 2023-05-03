import { useId } from "@radix-ui/react-id";
import { ReactElement, ReactNode, Ref, useState } from "react";
import React, { forwardRef } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { FormProvider, useFormContext } from "react-hook-form";
import classNames from "classnames";

import { getErrorFromUnknown } from "@/lib/errors";
import { Alert } from "@/ui/Alert";

import { showErrorToast } from "./Toast/Toast";

type InputProps = Omit<JSX.IntrinsicElements["input"], "name"> & {
  name: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(
        "block w-full rounded-sm border dark:bg-gray-900 dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-gray-800 sm:text-sm dark:text-gray-200",
        props.className
      )}
    />
  );
});

export function Label(props: JSX.IntrinsicElements["label"]) {
  return (
    <label
      {...props}
      className={classNames(
        "block text-sm font-medium text-gray-700 dark:text-gray-400",
        props.className
      )}
    >
      {props.children}
    </label>
  );
}

export function InputLeading(props: JSX.IntrinsicElements["div"]) {
  return (
    <span className="inline-flex flex-shrink-0 items-center rounded-l-sm border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
      {props.children}
    </span>
  );
}

type InputFieldProps = {
  label?: ReactNode;
  hint?: ReactNode;
  addOnLeading?: ReactNode;
} & React.ComponentProps<typeof Input> & {
    labelProps?: React.ComponentProps<typeof Label>;
  };

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(props, ref) {
    const id = useId();
    const methods = useFormContext();
    const {
      label = props.name,
      labelProps,
      placeholder = props.name + "_placeholder" !== props.name + "_placeholder"
        ? props.name + "_placeholder"
        : "",
      className,
      addOnLeading,
      hint,
      ...passThrough
    } = props;
    return (
      <div>
        {!!props.name && (
          <Label htmlFor={id} {...labelProps}>
            {label}
          </Label>
        )}
        {addOnLeading ? (
          <div className="mt-1 flex rounded-md shadow-sm">
            {addOnLeading}
            <Input
              id={id}
              placeholder={placeholder}
              className={classNames(
                "mt-0",
                props.addOnLeading && "rounded-l-none",
                className
              )}
              {...passThrough}
              ref={ref}
            />
          </div>
        ) : (
          <Input
            id={id}
            placeholder={placeholder}
            className={className}
            {...passThrough}
            ref={ref}
          />
        )}
        {hint}
        {methods?.formState?.errors[props.name]?.message && (
          <Alert
            className="mt-1"
            severity="error"
            message={<>{methods.formState.errors[props.name]!.message}</>}
          />
        )}
      </div>
    );
  }
);

export const TextField = forwardRef<HTMLInputElement, InputFieldProps>(
  function TextField(props, ref) {
    return <InputField ref={ref} {...props} />;
  }
);

export const ShowPassword = forwardRef<HTMLInputElement, InputFieldProps>(
  function ShowPassword(props, ref) {
    const [type, setType] = useState("password");
    const [Icon, setIcon] = useState<any>(EyeSlashIcon);

    const show = () => {
      type === "password" ? setType("text") : setType("password");
      Icon === EyeIcon ? setIcon(EyeSlashIcon) : setIcon(EyeIcon);
    };
    return (
      <div className="relative mt-1">
        <Input
          type={type}
          required={true}
          minLength={8}
          maxLength={40}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3">
          <Icon
            className="h-5 w-5 cursor-pointer text-gray-400 "
            aria-hidden="true"
            onClick={show}
          />
        </div>
      </div>
    );
  }
);

export const PasswordField = forwardRef<HTMLInputElement, InputFieldProps>(
  function PasswordField(props, ref) {
    return (
      <InputField
        data-testid="password"
        type="password"
        placeholder="•••••••••••••"
        ref={ref}
        {...props}
      />
    );
  }
);

export const EmailInput = forwardRef<HTMLInputElement, InputFieldProps>(
  function EmailInput(props, ref) {
    return (
      <Input
        ref={ref}
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        inputMode="email"
        {...props}
      />
    );
  }
);

export const EmailField = forwardRef<HTMLInputElement, InputFieldProps>(
  function EmailField(props, ref) {
    return (
      <InputField
        ref={ref}
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        inputMode="email"
        {...props}
      />
    );
  }
);

type TextAreaProps = Omit<JSX.IntrinsicElements["textarea"], "name"> & {
  name: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextAreaInput(props, ref) {
    return (
      <textarea
        ref={ref}
        {...props}
        className={classNames(
          "block w-full rounded-sm dark:bg-gray-900 dark:border-gray-900 dark:text-gray-200 border-gray-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm",
          props.className
        )}
      />
    );
  }
);

type TextAreaFieldProps = {
  label?: ReactNode;
} & React.ComponentProps<typeof TextArea> & {
    labelProps?: React.ComponentProps<typeof Label>;
  };

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(function TextField(props, ref) {
  const id = useId();
  const methods = useFormContext();
  const {
    label = props.name,
    labelProps,
    placeholder = props.name + "_placeholder" !== props.name + "_placeholder"
      ? props.name + "_placeholder"
      : "",
    ...passThrough
  } = props;
  return (
    <div>
      {!!props.name && (
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>
      )}
      <TextArea ref={ref} placeholder={placeholder} {...passThrough} />
      {methods?.formState?.errors[props.name]?.message && (
        <Alert
          className="mt-1"
          severity="error"
          message={<>{methods.formState.errors[props.name]!.message}</>}
        />
      )}
    </div>
  );
});

type FormProps<T extends object> = {
  form: UseFormReturn<T>;
  handleSubmit: SubmitHandler<T>;
} & Omit<JSX.IntrinsicElements["form"], "onSubmit">;

const PlainForm = <T extends FieldValues>(
  props: FormProps<T>,
  ref: Ref<HTMLFormElement>
) => {
  const { form, handleSubmit, ...passThrough } = props;

  return (
    <FormProvider {...form}>
      <form
        ref={ref}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          form
            .handleSubmit(handleSubmit)(event)
            .catch((err) => {
              showErrorToast(`${getErrorFromUnknown(err).message}`);
            });
        }}
        {...passThrough}
      >
        {
          /* @see https://react-hook-form.com/advanced-usage/#SmartFormComponent */
          React.Children.map(props.children, (child) => {
            return typeof child !== "string" &&
              typeof child !== "number" &&
              typeof child !== "boolean" &&
              child &&
              "props" in child &&
              child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: form.register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        }
      </form>
    </FormProvider>
  );
};

export const Form = forwardRef(PlainForm) as <T extends FieldValues>(
  p: FormProps<T> & { ref?: Ref<HTMLFormElement> }
) => ReactElement;

export function FieldsetLegend(props: JSX.IntrinsicElements["legend"]) {
  return (
    <legend
      {...props}
      className={classNames(
        "text-sm font-medium text-gray-700",
        props.className
      )}
    >
      {props.children}
    </legend>
  );
}

export function InputGroupBox(props: JSX.IntrinsicElements["div"]) {
  return (
    <div
      {...props}
      className={classNames(
        "space-y-2 rounded-sm border border-gray-300 bg-white p-2",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

interface SelectFieldProps {
  name: string;
  label?: string;
  labelProps?: React.HTMLAttributes<HTMLLabelElement>;
  placeholder?: string;
  className?: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(props, ref) {
    const methods = useFormContext();
    const {
      name,
      label = props.name,
      labelProps,
      placeholder = props.placeholder ? props.placeholder : "",
      className,
      options,
      defaultValue,
      ...passThrough
    } = props;
    return (
      <>
        {!!props.name && (
          <Label htmlFor={props.name} {...labelProps}>
            {label}
          </Label>
        )}
        <div className="customSelect">
          <select
            id={name}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={classNames(
              "block w-full rounded-sm border dark:bg-gray-900 dark:border-gray-900 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm dark:text-gray-200",
              props.className
            )}
            ref={ref}
            {...passThrough}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {methods?.formState?.errors[props.name]?.message && (
          <p className="mt-1 text-yellow-700">
            {<>{methods.formState.errors[props.name]!.message}</>}
          </p>
        )}
      </>
    );
  }
);
