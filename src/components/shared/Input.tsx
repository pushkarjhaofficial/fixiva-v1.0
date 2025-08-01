// src/components/shared/Input.tsx

import React from "react"
import clsx from "clsx"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input: React.FC<Props> = ({ label, error, className, ...props }) => {
  return (
    <div className="space-y-1 w-full">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        {...props}
        className={clsx(
          "w-full px-3 py-2 rounded border text-sm dark:bg-neutral-900",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-neutral-300 dark:border-neutral-700 focus:ring-primary-600",
          className
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default Input
