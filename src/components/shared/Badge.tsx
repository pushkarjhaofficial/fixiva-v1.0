import React from "react"
import clsx from "clsx"

export type BadgeType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "loyalty"
  | "recycle"
  | "vendor"
  | "admin"
  | "govt_officer"
  | "govt_contractor"
  | "govt_employee"
  | "corp_admin"
  | "client_partner"
  | "support_agent"
  | "auditor"
  | "franchise_owner"

export interface BadgeProps {
  children: React.ReactNode
  type?: BadgeType
  icon?: React.ReactNode
  className?: string
  pill?: boolean
  size?: "sm" | "md" | "lg"
}

/**
 * Badge
 * For status, roles, categories, loyalty, etc.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  type = "default",
  icon,
  className = "",
  pill = false,
  size = "md"
}) => {
  const typeStyles = {
    default: "bg-gray-300 text-gray-700",
    primary: "bg-[--color-primary] text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-400 text-black",
    danger: "bg-red-600 text-white",
    info: "bg-blue-500 text-white",
    loyalty: "bg-orange-400 text-white",
    recycle: "bg-green-700 text-white",
    vendor: "bg-indigo-700 text-white",
    admin: "bg-black text-white",
    govt_officer: "bg-[#ffcc00] text-black",
    govt_contractor: "bg-[#ff6600] text-white",
    govt_employee: "bg-[#ff9900] text-white",
    corp_admin: "bg-[#0066cc] text-white",
    client_partner: "bg-[#cc0099] text-white",
    support_agent: "bg-[#00cc99] text-white",
    auditor: "bg-[#ff3399] text-white",
    franchise_owner: "bg-[#6633cc] text-white"
  }[type]

  const sizeCls =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : size === "lg"
      ? "text-base px-4 py-1"
      : "text-sm px-3 py-0.5"

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 font-semibold rounded uppercase tracking-wide",
        typeStyles,
        sizeCls,
        pill && "rounded-full",
        className
      )}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
