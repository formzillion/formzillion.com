import classNames from "classnames";
import type { GroupBase, InputProps, Props } from "react-select";
import ReactSelect, { components } from "react-select";

export type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>;

export const InputComponent = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  inputClassName,
  ...props
}: InputProps<Option, IsMulti, Group>) => {
  return (
    <components.Input
      // disables our default form focus hightlight on the react-select input element
      inputClassName={classNames(
        "focus:ring-0 focus:ring-offset-0",
        inputClassName
      )}
      {...props}
    />
  );
};

function CSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({ className, ...props }: SelectProps<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      theme={(theme: any) => ({
        ...theme,
        borderRadius: 2,
        colors: {
          ...theme.colors,
          primary: "var(--brand-color)",

          primary50: "rgba(209 , 213, 219, var(--tw-bg-opacity))",
          primary25: "rgba(244, 245, 246, var(--tw-bg-opacity))",
        },
      })}
      styles={{
        option: (provided: any, state: any) => ({
          ...provided,
          color: state.isSelected ? "var(--brand-text-color)" : "black",
          ":active": {
            backgroundColor: state.isSelected ? "" : "var(--brand-color)",
            color: "var(--brand-text-color)",
          },
        }),
      }}
      components={{
        ...components,
        IndicatorSeparator: () => null,
        Input: InputComponent,
      }}
      className={className}
      {...props}
    />
  );
}

export default CSelect;

export function UnstyledSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({ className, ...props }: SelectProps<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      {...props}
      isSearchable={false}
      theme={(theme: any) => ({ ...theme, borderRadius: 0, border: "none" })}
      components={{
        IndicatorSeparator: () => null,
        Input: InputComponent,
      }}
      styles={{
        container: (provided: any) => ({
          ...provided,
          width: "100%",
        }),
        control: (provided: any) => ({
          ...provided,
          backgroundColor: " transparent",
          border: "none",
          boxShadow: "none",
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          color: state.isSelected ? "var(--brand-text-color)" : "black",
          ":active": {
            backgroundColor: state.isSelected ? "" : "var(--brand-color)",
            color: "var(--brand-text-color)",
          },
        }),
        indicatorSeparator: () => ({
          display: "hidden",
          color: "black",
        }),
      }}
    />
  );
}
