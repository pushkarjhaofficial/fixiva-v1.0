import React from "react"
import { motion } from "framer-motion"
import clsx from "clsx"

export type BookingStepStatus = "pending" | "active" | "complete" | "error" | "locked"
export type BookingStepRole =
  | "customer"
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

export interface BookingStepCardProps {
  step: number
  title: string
  description?: string
  status: BookingStepStatus
  current?: boolean
  role?: BookingStepRole
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  animated?: boolean
}

const statusStyles: Record<BookingStepStatus, string> = {
  pending: "bg-gray-200 text-gray-700",
  active: "bg-[--color-primary] text-white shadow-md",
  complete: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  locked: "bg-gray-400 text-gray-100 opacity-60 cursor-not-allowed",
}

export const BookingStepCard: React.FC<BookingStepCardProps> = ({
  step,
  title,
  description,
  status,
  current = false,
  role = "customer",
  icon,
  onClick,
  className = "",
  disabled = false,
  animated = true,
}) => {
  const isClickable = Boolean(onClick && !disabled && status !== "locked")

  return (
    <motion.div
      role="button"
      aria-current={current ? "step" : undefined}
      aria-disabled={disabled || status === "locked"}
      tabIndex={isClickable ? 0 : -1}
      onClick={isClickable ? onClick : undefined}
      onKeyPress={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          onClick!()
        }
      }}
      whileHover={isClickable && animated ? { scale: 1.04 } : undefined}
      whileTap={isClickable && animated ? { scale: 0.98 } : undefined}
      className={clsx(
        "flex items-center px-4 py-3 mb-2 rounded-lg transition-colors focus:outline-none select-none",
        statusStyles[status],
        current && "ring-2 ring-[--color-primary] ring-offset-2",
        disabled && "opacity-60",
        className
      )}
      data-step={step}
      data-role={role}
    >
      <div
        className={clsx(
          "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-white bg-white text-[--color-primary] font-bold",
          status === "locked" && "opacity-50"
        )}
      >
        {icon ?? step}
      </div>

      <div className="flex-1 ml-3 min-w-0">
        <div className="font-semibold truncate">{title}</div>
        {description && (
          <div className="text-xs text-gray-600 truncate">{description}</div>
        )}
        <div className="mt-1">
          <span className="inline-block px-2 py-0.5 rounded bg-[--color-primary]/10 text-[--color-primary] text-[10px] uppercase tracking-wide">
            {role.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      <span
        className={clsx(
          "ml-4 w-3 h-3 rounded-full border-2",
          status === "complete"
            ? "bg-green-500 border-green-600"
            : status === "active"
            ? "bg-[--color-primary] border-[--color-primary]"
            : status === "error"
            ? "bg-red-500 border-red-600"
            : status === "locked"
            ? "bg-gray-300 border-gray-400"
            : "bg-gray-200 border-gray-300"
        )}
        aria-hidden="true"
      />
    </motion.div>
  )
}

export default BookingStepCard
