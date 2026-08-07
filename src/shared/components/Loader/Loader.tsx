import type { LoaderProps } from "./Loader.types";

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export default function Loader({
  fullScreen = false,
  size = "md",
}: LoaderProps) {
  const loader = (
    <div
      className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-300 border-t-blue-600`}
    />
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {loader}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {loader}
    </div>
  );
}