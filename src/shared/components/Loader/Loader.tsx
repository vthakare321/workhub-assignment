import type { LoaderProps } from "./Loader.types";

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export default function Loader({
  fullScreen = false,
  size = "md",
}: LoaderProps) {
  const spinner = (
    <div
      className={`
        ${sizeClasses[size]}
        animate-spin
        rounded-full
        border-2
        border-current
        border-t-transparent
      `}
    />
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}