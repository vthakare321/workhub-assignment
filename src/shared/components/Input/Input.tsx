import { forwardRef } from "react";

import type { InputProps } from "./Input.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      required = false,
      containerClassName = "",
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={id}
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {label}

            {required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          {...props}
          className={`
            w-full
            rounded-md
            border
            px-3
            py-2
            outline-none
            transition-colors

            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-600"
            }

            disabled:cursor-not-allowed
            disabled:bg-gray-100

            ${className}
          `}
        />

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;