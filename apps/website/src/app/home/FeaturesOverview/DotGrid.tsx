import clsx from "clsx";

const Dot = ({ className }: { className?: string }) => (
  <div
    className={clsx("w-[4.5px] h-[4.5px] bg-white rounded-[1.5px]", className)}
  />
)

export default function DotGrid({
  className,
  rows = 10,
  cols = 10,
  gap = 10,
}: {
  className?: string;
  rows?: number;
  cols?: number;
  gap?: number;
}) {
  return (
    <div className={clsx(className)}>
      {
        new Array(rows * cols).map((i) => (
          <Dot
            className={clsx(
              "transform",
              `translate-x-[${(i % cols) * gap}px]`,
              `translate-y-[${Math.floor(i / rows) * gap}px]`
            )}
          />
        ))
      }
    </div>
  )
}
