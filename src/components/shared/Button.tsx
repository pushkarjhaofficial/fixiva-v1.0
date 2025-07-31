import React from "react"
import clsx from "clsx"
import useAuth from "@/hooks/useAuth"
import { FIXIVA_ROLES, FixivaRole } from "@/context/AuthContext"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  /** Restrict render to Fixiva role(s), e.g. "admin" or ["admin","vendor"] */
  roleOnly?: FixivaRole | FixivaRole[]
  variant?: "primary" | "secondary" | "danger" | "glass"
}

// Helper: convert string(s) to FixivaRole(s) safely
function toFixivaRoles(roleOnly?: FixivaRole | FixivaRole[] | string | string[]): FixivaRole[] {
  if (!roleOnly) return []
  if (typeof roleOnly === "string") {
    return (FIXIVA_ROLES as readonly string[]).includes(roleOnly)
      ? [roleOnly as FixivaRole]
      : []
  }
  // Array case
  return (roleOnly as string[]).filter((r): r is FixivaRole => (FIXIVA_ROLES as readonly string[]).includes(r))
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  iconLeft,
  iconRight,
  roleOnly,
  variant = "primary",
  ...rest
}) => {
  const { role, hasRole } = useAuth()

  // Role-based display: null if not allowed
  if (
    roleOnly &&
    !(
      (typeof roleOnly === "string" && role === roleOnly) ||
      (Array.isArray(roleOnly) && hasRole(toFixivaRoles(roleOnly)))
    )
  ) {
    return null
  }

  return (
    <button
      className={clsx(
        "flex items-center gap-2 rounded px-4 py-2 font-semibold transition focus:outline-none",
        {
          "bg-[--color-primary] text-white hover:bg-opacity-90": variant === "primary",
          "bg-[--color-secondary] text-[--color-primary] hover:bg-opacity-80": variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700": variant === "danger",
          "backdrop-blur bg-white/10 border border-white/20 shadow text-[--color-text]": variant === "glass",
          "opacity-60 cursor-not-allowed": loading || rest.disabled
        }
      )}
      disabled={loading || rest.disabled}
      aria-busy={loading}
      {...rest}
    >
      {iconLeft && <span className="text-lg">{iconLeft}</span>}
      <span>{children}</span>
      {loading && (
        <svg
          className="animate-spin ml-1 h-5 w-5 text-current"
          viewBox="0 0 24 24"
          fill="none"
          aria-label="Loading"
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
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      )}
      {iconRight && <span className="text-lg">{iconRight}</span>}
    </button>
  )
}

export default Button
