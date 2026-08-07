import type { SkeletonProps } from "./Skeleton.types";

export default function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse
        rounded-md
        bg-gray-200
        ${className}
      `}
    />
  );
}