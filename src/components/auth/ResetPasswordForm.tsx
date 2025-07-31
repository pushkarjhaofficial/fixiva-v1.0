// src/components/auth/ResetPasswordForm.tsx

import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useNotification } from "@/hooks/useNotification"
import useLanguage from "@/hooks/useLanguage"
import { useSearchParams, Link } from "react-router-dom"
import { resetPassword } from "@/services/auth"

export interface ResetPasswordFormProps {
  /** Called after successful reset */
  onSuccess?: () => void
  /** Optional wrapper class */
  className?: string
}

/**
 * ResetPasswordForm
 * Reads a `token` query param, lets user choose a new password, confirms it,
 * calls your auth.resetPassword(), handles notifications, theming, and i18n.
 */
const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess, className }) => {
  const { t } = useTranslation()
  const { notifyError, notifySuccess } = useNotification()
  const { lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") || ""

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      notifyError(t("auth.invalidResetToken"))
    }
  }, [token, notifyError, t])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) {
      notifyError(t("auth.fillPassword"))
      return
    }
    if (password !== confirm) {
      notifyError(t("auth.passwordMismatch"))
      return
    }
    setLoading(true)
    try {
      await resetPassword(token, password)
      notifySuccess(t("auth.resetSuccess"))
      if (onSuccess) onSuccess()
    } catch (err: any) {
      notifyError(err.message || t("auth.resetFailed"))
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
        {t("auth.resetPasswordTitle")}
      </h1>

      <div className="mb-4">
        <label
          htmlFor="new-password"
          className="block mb-1 font-medium text-[--color-text]"
        >
          {t("auth.newPassword")}
        </label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("auth.newPasswordPlaceholder")}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-[--color-border] rounded focus:outline-none focus:border-[--color-primary] bg-[--color-bg] text-[--color-text]"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirm-password"
          className="block mb-1 font-medium text-[--color-text]"
        >
          {t("auth.confirmPassword")}
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder={t("auth.confirmPasswordPlaceholder")}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-[--color-border] rounded focus:outline-none focus:border-[--color-primary] bg-[--color-bg] text-[--color-text]"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !token}
        className={clsx(
          "w-full py-2 rounded font-semibold transition focus:outline-none",
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[--color-primary] text-white hover:bg-[--color-primary]/90"
        )}
        aria-busy={loading}
      >
        {loading ? t("auth.resetting") : t("auth.resetPassword")}
      </button>

      <div className="mt-4 text-center text-sm">
        <Link to="/login" className="text-[--color-primary] hover:underline">
          ← {t("auth.backToLogin")}
        </Link>
      </div>
    </form>
  )
}

export default ResetPasswordForm
