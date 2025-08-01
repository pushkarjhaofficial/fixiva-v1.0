// src/components/shared/Select.tsx

import React from "react"

interface Option {
  label: string
  value: string
}

interface Props {
  options: Option[]
  value: string
  onChange: (val: string) => void
  label?: string
  placeholder?: string
}

const Select: React.FC<Props> = ({ label, options, value, onChange, placeholder }) => {
  return (
    <div className="space-y-1 w-full">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <select
        className="w-full px-3 py-2 rounded border text-sm dark:bg-neutral-900 dark:border-neutral-700"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select