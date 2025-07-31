// src/components/auth/RegisterForm.tsx

import React, { useState } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import useAuth from "@/hooks/useAuth"
import { useNotification } from "@/hooks/useNotification"
import useLanguage from "@/hooks/useLanguage"
import { Link } from "react-router-dom"

export interface RegisterFormProps {
  /** Called after a successful registration */
  onSuccess: () => void
  /** Optional wrapper class */
  className?: string
}

/**
 * RegisterForm
 * Collects name, email, password and confirm-password.
 * Validates on client, calls your auth.register(),
 * handles notifications, theming, and i18n.
 */
const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, className }) => {
  const { t } = useTranslation()
  const { register } = useAuth()
  const { notifyError, notifySuccess } = useNotification()
  const { lang } = useLanguage()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      notifyError(t("auth.fillAllFields"))
      return
    }
    if (password !== confirm) {
      notifyError(t("auth.passwordMismatch"))
      return
    }
    setLoading(true)
    try {
      await register(name.trim(), email.trim(), password)
      notifySuccess(t("auth.registerSuccess"))
      onSuccess()
    } catch (err: any) {
      notifyError(err.message || t("auth.registerFailed"))
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
      <h1 className="text-2xl font-semibold mb-6 text-[--color-text]">
        {t("auth.registerTitle")}
      </h1>

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium text-[--color-text]">
          {t("auth.name")}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("auth.namePlaceholder")}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-[--color-border] rounded focus:outline-none focus:border-[--color-primary] bg-[--color-bg] text-[--color-text]"
        />
      </div>

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

      {/* Confirm Password */}
      <div className="mb-6">
        <label htmlFor="confirm" className="block mb-1 font-medium text-[--color-text]">
          {t("auth.confirmPassword")}
        </label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder={t("auth.confirmPasswordPlaceholder")}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-[--color-border] rounded focus:outline-none focus:border-[--color-primary] bg-[--color-bg] text-[--color-text]"
        />
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
        {loading ? t("auth.registering") : t("auth.register")}
      </button>

      {/* Login Link */}
      <p className="mt-4 text-center text-sm text-[--color-text]">
        {t("auth.haveAccount")}{" "}
        <Link to="/login" className="text-[--color-primary] hover:underline">
          {t("auth.login")}
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm
