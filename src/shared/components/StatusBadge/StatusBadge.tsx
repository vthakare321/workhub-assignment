import type { StatusBadgeProps } from "./StatusBadge.types";

const variantClasses = {
  default:
    "bg-gray-100 text-gray-700",

  success:
    "bg-green-100 text-green-700",

  warning:
    "bg-yellow-100 text-yellow-700",

  danger:
    "bg-red-100 text-red-700",

  info:
    "bg-blue-100 text-blue-700",
};

export default function StatusBadge({
  label,
  variant = "default",
  className = "",
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {label}
    </span>
  );
}