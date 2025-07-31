import React from "react"
import clsx from "clsx"

export type ToastType = "success" | "error" | "info" | "warning"

export interface ToastProps {
  show: boolean
  type?: ToastType
  message: string
  onClose: () => void
  duration?: number // ms, auto-close if set
  className?: string
}

/**
 * Toast
 * Inline, theme-aware, accessible, role-aware toast/alert for Fixiva UI.
 */
export const Toast: React.FC<ToastProps> = ({
  show,
  type = "info",
  message,
  onClose,
  duration = 3500,
  className = ""
}) => {
  React.useEffect(() => {
    if (!show || !duration) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [show, duration, onClose])

  if (!show) return null

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-400 text-black"
  }[type]

  return (
    <div
      className={clsx(
        "fixed left-1/2 -translate-x-1/2 bottom-8 z-50 shadow-xl rounded px-5 py-3 min-w-[220px] flex items-center gap-2",
        typeStyles,
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      {/* Emoji for quick recognition */}
      <span>
        {type === "success" && "✅"}
        {type === "error" && "❌"}
        {type === "info" && "ℹ️"}
        {type === "warning" && "⚠️"}
      </span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-lg px-2 rounded hover:opacity-80 ml-2"
        aria-label="Close"
        style={{ background: "none", border: "none" }}
      >
        ×
      </button>
    </div>
  )
}

export default Toast
