// src/components/shared/Spinner.tsx

import React from "react"

interface Props {
  size?: number
  className?: string
}

const Spinner: React.FC<Props> = ({ size = 24, className }) => {
  return (
    <svg
      className={`animate-spin text-primary-600 ${className}`}
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}

export default Spinner
