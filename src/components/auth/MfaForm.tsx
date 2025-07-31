// src/components/auth/MfaForm.tsx

import React, { useState } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useNotification } from "@/hooks/useNotification"
import useLanguage from "@/hooks/useLanguage"

export interface MfaFormProps {
  /** Called to verify the entered code; should reject on failure */
  onVerify: (code: string) => Promise<void>
  /** Called to resend a new code; should reject on failure */
  onResend: () => Promise<void>
  /** Optional wrapper class */
  className?: string
}

/**
 * MfaForm
 * Prompts the user for a 6-digit MFA/OTP code, allows resending,
 * handles loading state, notifications, theming, and i18n.
 */
const MfaForm: React.FC<MfaFormProps> = ({ onVerify, onResend, className }) => {
  const { t } = useTranslation()
  const { notifyError, notifySuccess } = useNotification()
  const { lang } = useLanguage()

  const [code, setCode] = useState("")
  const [loadingVerify, setLoadingVerify] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(code)) {
      notifyError(t("auth.invalidCode"))
      return
    }
    setLoadingVerify(true)
    try {
      await onVerify(code)
      notifySuccess(t("auth.codeVerified"))
    } catch (err: any) {
      notifyError(err?.message || t("auth.verifyFailed"))
    } finally {
      setLoadingVerify(false)
    }
  }

  const handleResend = async () => {
    setLoadingResend(true)
    try {
      await onResend()
      notifySuccess(t("auth.codeResent"))
    } catch (err: any) {
      notifyError(err?.message || t("auth.resendFailed"))
    } finally {
      setLoadingResend(false)
    }
  }

  return (
    <form
      onSubmit={handleVerify}
      className={clsx(
        "max-w-sm mx-auto bg-[--color-bg] p-6 rounded-lg shadow",
        className
      )}
    >
      <h1 className="text-2xl font-semibold mb-4 text-[--color-text]">
        {t("auth.mfaTitle")}
      </h1>
      <p className="mb-6 text-[--color-text] text-sm">
        {t("auth.mfaInstructions")}
      </p>

      <div className="mb-6">
        <label
          htmlFor="mfa-code"
          className="block mb-1 font-medium text-[--color-text]"
        >
          {t("auth.mfaCode")}
        </label>
        <input
          id="mfa-code"
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="••••••"
          required
          disabled={loadingVerify}
          className="w-full px-3 py-2 border border-[--color-border] rounded focus:outline-none focus:border-[--color-primary] bg-[--color-bg] text-[--color-text] text-center tracking-widest text-lg"
        />
      </div>

      <button
        type="submit"
        disabled={loadingVerify}
        className={clsx(
          "w-full py-2 rounded font-semibold transition focus:outline-none mb-4",
          loadingVerify
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[--color-primary] text-white hover:bg-[--color-primary]/90"
        )}
        aria-busy={loadingVerify}
      >
        {loadingVerify ? t("auth.verifying") : t("auth.verify")}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={loadingResend}
          className={clsx(
            "text-sm underline transition focus:outline-none",
            loadingResend && "opacity-50 cursor-not-allowed"
          )}
        >
          {loadingResend ? t("auth.resending") : t("auth.resendCode")}
        </button>
      </div>
    </form>
  )
}

export default MfaForm
