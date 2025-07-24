import React from 'react'
import classNames from 'classnames'

const InputComp = ({
  type = 'text',
  label,
  placeholder,
  error,
  disabled = false,
  className,
  value,
  onChange,
  required = false,
  helperText,
  startIcon,
  endIcon,
  ...props
}) => {
  const baseInputStyles = 'w-full rounded-md border bg-white px-4 py-2 text-sm transition-colors duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500'
  }

  const variant = error ? 'error' : 'default'

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {startIcon}
          </div>
        )}

        <input
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classNames(
            baseInputStyles,
            variants[variant],
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            disabled && 'cursor-not-allowed bg-gray-50 opacity-50',
            className
          )}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {endIcon}
          </div>
        )}
      </div>

      {helperText && (
        <p className={classNames(
          'mt-1.5 text-sm',
          error ? 'text-red-500' : 'text-gray-500'
        )}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export default InputComp
