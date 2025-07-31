import React, { useState, useRef, useEffect, useCallback } from "react"
import clsx from "clsx"
import { useNotification } from "@/hooks/useNotification"

export interface BookingOtpFormProps {
  /** Number of digits in the OTP (default 6) */
  length?: number
  /** Called when OTP is complete and user presses Verify */
  onVerify: (otp: string) => Promise<void>
  /** Called when user clicks Resend */
  onResend: () => Promise<void>
  /** Time (in seconds) until resend is allowed (default 60) */
  resendDelay?: number
  /** Disable the entire form */
  disabled?: boolean
  /** CSS class for wrapper */
  className?: string
}

export const BookingOtpForm: React.FC<BookingOtpFormProps> = ({
  length = 6,
  onVerify,
  onResend,
  resendDelay = 60,
  disabled = false,
  className
}) => {
  const { notifyError, notifySuccess } = useNotification()
  const [values, setValues] = useState<string[]>(Array(length).fill(""))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [verifying, setVerifying] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [resending, setResending] = useState(false)

  // Start countdown when component mounts or after resend
  useEffect(() => {
    if (resendTimer <= 0) return
    const id = setInterval(() => setResendTimer((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [resendTimer])

  // Handlers
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
      const val = e.target.value.replace(/\D/g, "")
      if (!val) return
      const char = val[0]
      setValues((prev) => {
        const next = [...prev]
        next[idx] = char
        return next
      })
      const nextIdx = idx + 1 < length ? idx + 1 : idx
      setActiveIndex(nextIdx)
      inputsRef.current[nextIdx]?.focus()
    },
    [length]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
      if (e.key === "Backspace" && !values[idx] && idx > 0) {
        setActiveIndex(idx - 1)
        inputsRef.current[idx - 1]?.focus()
      }
      if (e.key === "ArrowLeft" && idx > 0) {
        setActiveIndex(idx - 1)
        inputsRef.current[idx - 1]?.focus()
      }
      if (e.key === "ArrowRight" && idx + 1 < length) {
        setActiveIndex(idx + 1)
        inputsRef.current[idx + 1]?.focus()
      }
    },
    [length, values]
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const paste = e.clipboardData.getData("text").trim().slice(0, length)
      if (/^\d+$/.test(paste)) {
        const chars = paste.split("")
        setValues((prev) => {
          const next = [...prev]
          for (let i = 0; i < length; i++) next[i] = chars[i] || ""
          return next
        })
        const lastFilled = Math.min(chars.length, length - 1)
        setActiveIndex(lastFilled)
        inputsRef.current[lastFilled]?.focus()
      }
    },
    [length]
  )

  const handleVerify = useCallback(async () => {
    const otp = values.join("")
    if (otp.length < length || otp.includes("")) {
      notifyError("Please enter the complete OTP.")
      return
    }
    setVerifying(true)
    try {
      await onVerify(otp)
      notifySuccess("OTP verified successfully.")
    } catch (err: any) {
      notifyError(err?.message || "OTP verification failed.")
    } finally {
      setVerifying(false)
    }
  }, [length, notifyError, notifySuccess, onVerify, values])

  const handleResend = useCallback(async () => {
    setResending(true)
    try {
      await onResend()
      notifySuccess("OTP resent. Please check your messages.")
      setResendTimer(resendDelay)
    } catch (err: any) {
      notifyError(err?.message || "Failed to resend OTP.")
    } finally {
      setResending(false)
    }
  }, [onResend, notifyError, notifySuccess, resendDelay])

  return (
    <div className={clsx("space-y-4", className)}>
      <div className="flex justify-center gap-2">
        {values.map((val, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            disabled={disabled || verifying}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            className={clsx(
              "w-10 h-10 text-center text-lg font-medium rounded border transition-colors focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/30",
              disabled && "bg-gray-100 cursor-not-allowed",
              activeIndex === idx && "ring-2 ring-[--color-primary]"
            )}
            aria-label={`OTP digit ${idx + 1}`}
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleResend}
          disabled={resendTimer > 0 || resending || disabled}
          className={clsx(
            "text-sm font-medium",
            resendTimer > 0 || resending || disabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-[--color-primary] hover:underline"
          )}
        >
          {resending
            ? "Resending…"
            : resendTimer > 0
            ? `Resend in ${resendTimer}s`
            : "Resend OTP"}
        </button>
        <button
          onClick={handleVerify}
          disabled={verifying || disabled}
          className={clsx(
            "px-4 py-2 rounded font-semibold transition",
            verifying
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[--color-primary] text-white hover:bg-[--color-primary]/90"
          )}
        >
          {verifying ? "Verifying…" : "Verify OTP"}
        </button>
      </div>
    </div>
  )
}

export default BookingOtpForm
