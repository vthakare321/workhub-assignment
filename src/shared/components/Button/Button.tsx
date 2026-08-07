import { forwardRef } from "react";

import Loader from "@/shared/components/Loader";

import type { ButtonProps } from "./Button.types";

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700",

  secondary:
    "bg-gray-600 text-white hover:bg-gray-700",

  outline:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",

  md: "px-4 py-2",

  lg: "px-6 py-3 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      loading = false,
      disabled = false,
      fullWidth = false,
      variant = "primary",
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex
          items-center
          justify-center
          rounded-md
          font-medium
          transition-colors
          disabled:cursor-not-allowed
          disabled:opacity-50

          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <Loader size="sm" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;