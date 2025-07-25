import React from 'react'
import classNames from 'classnames'
import { FaChevronDown } from 'react-icons/fa'

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Seçiniz",
  error,
  disabled = false,
  required = false,
  className,
  helperText,
  ...props
}) => {
  const baseSelectStyles = 'w-full rounded-md border bg-white px-4 py-2 text-sm transition-colors duration-200 appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500'
  }

  const variant = error ? 'error' : 'default'

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={classNames(
            baseSelectStyles,
            variants[variant],
            disabled && 'cursor-not-allowed bg-gray-50 opacity-50',
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <FaChevronDown size={12} />
        </div>
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

export default Select