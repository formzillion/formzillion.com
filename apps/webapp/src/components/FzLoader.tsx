import clsx from "clsx";

export default function FzLoader({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={clsx("fz-loader", className)} />
  )
}