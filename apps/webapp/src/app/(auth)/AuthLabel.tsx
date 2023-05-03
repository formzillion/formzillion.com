import classNames from "classnames";

export function AuthLabel(props: JSX.IntrinsicElements["label"]) {
  return (
    <label
      {...props}
      className={classNames(
        "block text-sm font-medium text-gray-400 dark:text-gray-400",
        props.className
      )}
    >
      {props.children}
    </label>
  );
}
