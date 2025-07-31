// src/components/auth/ForgotPasswordForm.tsx

import React, { useState } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useNotification } from "@/hooks/useNotification"
import useLanguage from "@/hooks/useLanguage"
import { Link } from "react-router-dom"
import { sendPasswordResetEmail } from "@/services/auth"

export interface ForgotPasswordFormProps {
  /** Called after user clicks “Back to login” */
  onBack?: () => void
  /** Optional wrapper class */
  className?: string
}

/**
 * ForgotPasswordForm
 * Collects email, sends a password-reset link via your auth service,
 * handles loading state, notifications, theming, and i18n.
 */
const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBack,
  className,
}) => {
  const { t } = useTranslation()
  const { notifySuccess, notifyError } = useNotification()
  const { lang } = useLanguage()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      notifyError(t("auth.fillEmail"))
      return
    }
    setLoading(true)
    try {
      await sendPasswordResetEmail(email.trim())
      notifySuccess(t("auth.resetLinkSent"))
    } catch (err: any) {
      notifyError(err.message || t("auth.resetLinkError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "max-w-md mx-auto bg-[--color-bg] p-6 rounded-lg shadow",
        className
      )}
    >
      <h1 className="text-2xl font-semibold mb-4 text-[--color-text]">
        {t("auth.forgotPasswordTitle")}
      </h1>

      <p className="mb-6 text-sm text-[--color-text]">
        {t("auth.forgotPasswordInstructions")}
      </p>

      <div className="mb-6">
        <label
          htmlFor="forgot-email"
          className="block mb-1 font-medium text-[--color-text]"
        >
          {t("auth.email")}
        </label>
        <input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("auth.emailPlaceholder")}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-[--color-border] rounded focus:outline-none focus:border-[--color-primary] bg-[--color-bg] text-[--color-text]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={clsx(
          "w-full py-2 rounded font-semibold transition focus:outline-none",
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[--color-primary] text-white hover:bg-[--color-primary]/90"
        )}
        aria-busy={loading}
      >
        {loading ? t("auth.sending") : t("auth.sendResetLink")}
      </button>

      <div className="mt-4 flex justify-between text-sm">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-[--color-primary] hover:underline"
          >
            ← {t("auth.backToLogin")}
          </button>
        ) : (
          <Link to="/login" className="text-[--color-primary] hover:underline">
            ← {t("auth.backToLogin")}
          </Link>
        )}
      </div>
    </form>
  )
}

export default ForgotPasswordForm
