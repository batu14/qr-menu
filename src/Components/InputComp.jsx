import React from "react";
import classNames from "classnames";

const InputComp = ({
  type = "text",
  label,
  placeholder,
  error,
  disabled = false,
  className,
  value = "",
  setValue,
  required = false,
  helperText,
  startIcon,
  endIcon,
  id,
  name,
  ...props
}) => {
  const baseInputStyles =
    "w-full rounded-md border bg-white px-4 py-2 text-sm transition-colors duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    error: "border-red-500 focus:border-red-500 focus:ring-red-500",
    success: "border-green-500 focus:border-green-500 focus:ring-green-500",
  };

  const variant = error ? "error" : "default";

  // Unique ID oluştur
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {startIcon}
          </div>
        )}

        <input
          id={inputId}
          name={name || inputId}
          type={type}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            setValue && setValue(e.target.value);
          }}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          className={classNames(
            baseInputStyles,
            variants[variant],
            startIcon && "pl-10",
            endIcon && "pr-10",
            disabled && "cursor-not-allowed bg-gray-50 opacity-50",
            className
          )}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>

      {helperText && (
        <p
          id={`${inputId}-helper`}
          className={classNames(
            "mt-1.5 text-sm",
            error ? "text-red-500" : "text-gray-500"
          )}
        >
          {helperText}
        </p>
      )}

      {error && typeof error === "string" && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputComp;
