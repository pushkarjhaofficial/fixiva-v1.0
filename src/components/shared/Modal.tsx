import React, { useEffect, useRef } from "react"
import clsx from "clsx"

export interface ModalProps {
  show: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  closeOnBackdrop?: boolean
  ariaLabel?: string
}

/**
 * Modal
 * Accessible, theme-aware universal dialog for Fixiva.
 */
export const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  title,
  className = "",
  size = "md",
  closeOnBackdrop = true,
  ariaLabel = "Dialog"
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!show) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [show, onClose])

  useEffect(() => {
    if (show && ref.current) {
      ref.current.focus()
    }
  }, [show])

  if (!show) return null

  const maxW =
    size === "sm"
      ? "max-w-sm"
      : size === "lg"
      ? "max-w-2xl"
      : size === "xl"
      ? "max-w-4xl"
      : "max-w-lg"

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      aria-label={ariaLabel}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        ref={ref}
        className={clsx(
          "outline-none shadow-2xl bg-[--color-bg] border border-[--color-border] rounded-xl p-6 animate-fadein",
          maxW,
          className
        )}
        style={{ minWidth: 320 }}
        tabIndex={0}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="text-xl font-bold mb-4 text-[--color-primary]">{title}</div>
        )}
        {children}
        <button
          className="absolute top-4 right-5 text-2xl text-[--color-text] hover:opacity-70"
          onClick={onClose}
          aria-label="Close"
          style={{ background: "none", border: "none" }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Modal
