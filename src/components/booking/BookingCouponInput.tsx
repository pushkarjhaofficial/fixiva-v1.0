import React, { useState, useCallback } from "react"
import clsx from "clsx"
import { useNotification } from "@/hooks/useNotification"
// Assume you have an API service for validating coupons:
import { validateCoupon } from "@/services/coupon"

export interface CouponResult {
  valid: boolean
  discountPercentage: number
  code: string
}

export interface BookingCouponInputProps {
  /** Current coupon code value */
  value: string
  /** Called when input changes */
  onChange: (code: string) => void
  /** Called after a successful apply */
  onApply: (result: CouponResult) => void
  /** Optional CSS class */
  className?: string
}

export const BookingCouponInput: React.FC<BookingCouponInputProps> = ({
  value,
  onChange,
  onApply,
  className
}) => {
  const { notifyError, notifySuccess } = useNotification()
  const [loading, setLoading] = useState(false)

  const handleApply = useCallback(async () => {
    if (!value.trim()) {
      notifyError("Please enter a coupon code.")
      return
    }
    setLoading(true)
    try {
      const res = await validateCoupon(value.trim())
      if (res.valid) {
        notifySuccess(`Coupon applied! ${res.discountPercentage}% off.`)
        onApply({ ...res, code: value.trim() })
      } else {
        notifyError("Invalid or expired coupon.")
      }
    } catch (err: any) {
      notifyError(err?.message || "Failed to apply coupon.")
    } finally {
      setLoading(false)
    }
  }, [value, onApply, notifyError, notifySuccess])

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <input
        type="text"
        placeholder="Enter coupon code"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        disabled={loading}
        className={clsx(
          "flex-1 px-3 py-2 border rounded-md shadow-sm bg-[--color-bg] border-[--color-border] focus:outline-none focus:border-[--color-primary] text-sm",
          loading && "opacity-60 cursor-not-allowed"
        )}
        aria-label="Coupon code"
      />
      <button
        onClick={handleApply}
        disabled={loading}
        className={clsx(
          "px-4 py-2 rounded-md font-semibold transition focus:outline-none",
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[--color-primary] text-white hover:bg-[--color-primary]/90"
        )}
        aria-busy={loading}
      >
        {loading ? "Applying…" : "Apply"}
      </button>
    </div>
  )
}

export default BookingCouponInput
