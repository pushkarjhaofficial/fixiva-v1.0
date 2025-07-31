// src/components/auth/LoginForm.tsx

import React, { useState } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import useAuth from "@/hooks/useAuth"
import { useNotification } from "@/hooks/useNotification"
import useLanguage from "@/hooks/useLanguage"
import { Link } from "react-router-dom"

export interface LoginFormProps {
  /** Called after a successful login */
  onSuccess: () => void
  /** Optional wrapper class */
  className?: string
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, className }) => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const { notifyError, notifySuccess } = useNotification()
  const { lang } = useLanguage()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      notifyError(t("auth.fillAllFields"))
      return
    }
    setLoading(true)
    try {
      // ← dropped `remember` here to match login(email, password)
      await login(email.trim(), password)
      // handle `remember` persistence separately if needed
      notifySuccess(t("auth.loginSuccess"))
      onSuccess()
    } catch (err: any) {
      notifyError(err.message || t("auth.loginFailed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("max-w-md mx-auto bg-[--color-bg] p-6 rounded-lg shadow", className)}
    >
      <h1 className="text-2xl font-semibold mb-6 text-[--color-text]">
        {t("auth.loginTitle")}
      </h1>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium text-[--color-text]">
          {t("auth.email")}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("auth.emailPlaceholder")}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-[--color-border] rounded focus:outline-none focus:border-[--color-primary] bg-[--color-bg] text-[--color-text]"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1 font-medium text-[--color-text]">
          {t("auth.password")}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("auth.passwordPlaceholder")}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-[--color-border] rounded focus:outline-none focus:border-[--color-primary] bg-[--color-bg] text-[--color-text]"
        />
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between mb-6">
        <label className="inline-flex items-center text-[--color-text]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            disabled={loading}
            className="form-checkbox h-4 w-4 text-[--color-primary] transition"
          />
          <span className="ml-2 text-sm">{t("auth.rememberMe")}</span>
        </label>
        <Link to="/forgot-password" className="text-sm text-[--color-primary] hover:underline">
          {t("auth.forgotPassword")}
        </Link>
      </div>

      {/* Submit */}
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
        {loading ? t("auth.loggingIn") : t("auth.login")}
      </button>

      {/* Register Link */}
      <p className="mt-4 text-center text-sm text-[--color-text]">
        {t("auth.noAccount")}{" "}
        <Link to="/register" className="text-[--color-primary] hover:underline">
          {t("auth.register")}
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
