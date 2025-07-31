import React from "react"
import clsx from "clsx"

export type BookingFormInputType =
  | "text"
  | "number"
  | "email"
  | "tel"
  | "date"
  | "time"
  | "textarea"
  | "select"
  | "password"
  | "file"
  | "voice"
  | "autocomplete"

export interface BookingFormInputOption {
  value: string | number
  label: string
}

// onChange covers input, textarea, and select
export interface BookingFormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label: string
  type: BookingFormInputType
  name: string
  value: any
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
  options?: BookingFormInputOption[]
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  autoFocus?: boolean
  multilineRows?: number
  assistiveText?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const inputBase =
  "w-full px-3 py-2 rounded-md border outline-none transition-colors text-sm shadow-sm bg-[--color-bg] border-[--color-border] focus:border-[--color-primary] dark:bg-gray-800 dark:border-gray-700"

export const BookingFormInput: React.FC<BookingFormInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled,
  required,
  leftIcon,
  rightIcon,
  className,
  autoFocus,
  multilineRows = 3,
  assistiveText,
  inputProps
}) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={name}
            name={name}
            rows={multilineRows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={clsx(inputBase, error && "border-red-500", className)}
            autoFocus={autoFocus}
            {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        )

      case "select":
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={clsx(inputBase, error && "border-red-500", className)}
          >
            <option value="" disabled>
              {placeholder || "Select..."}
            </option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )

      default:
        return (
          <input
            id={name}
            name={name}
            type={type as any}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={clsx(inputBase, error && "border-red-500", className)}
            autoFocus={autoFocus}
            {...inputProps}
          />
        )
    }
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium mb-1 text-[--color-text]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative flex items-center">
        {leftIcon && <span className="absolute left-3 z-10">{leftIcon}</span>}
        <div className={clsx(leftIcon && "pl-8", rightIcon && "pr-8", "w-full")}>
          {renderInput()}
        </div>
        {rightIcon && <span className="absolute right-3 z-10">{rightIcon}</span>}
      </div>
      {assistiveText && <div className="text-xs text-gray-500 mt-0.5">{assistiveText}</div>}
      {error && <div className="text-xs text-red-500 mt-0.5">{error}</div>}
    </div>
  )
}

export default BookingFormInput
