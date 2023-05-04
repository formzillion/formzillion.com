import Loader from "@/ui/Loader";
import classNames from "classnames";

export default function Button({
  loading,
  type = "button",
  disabled,
  className,
  children,
  onClick,
}: any) {
  const cls =
    "mt-0 flex items-center justify-center rounded-md bg-orange-600 py-2.5 px-4 text-white hover:bg-orange-700";
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={classNames(cls, className)}
      onClick={onClick}
    >
      {loading ? <Loader /> : children}
    </button>
  );
}
