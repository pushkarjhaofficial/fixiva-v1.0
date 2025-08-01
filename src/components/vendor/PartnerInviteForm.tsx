// src/components/vendor/PartnerInviteForm.tsx

import React, { useState } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"
import { FaUserPlus } from "react-icons/fa"

export interface PartnerInviteFormProps {
  onSubmit: (values: { name: string; email: string; phone: string; type: string }) => Promise<void> | void
  loading?: boolean
  error?: string
  success?: string
  className?: string
}

const PARTNER_TYPES = [
  { value: "vendor_partner", labelKey: "vendor.partnerType.vendor" },
  { value: "client_partner", labelKey: "vendor.partnerType.client" },
  { value: "recycle_agent", labelKey: "vendor.partnerType.recycle" }
]

const PartnerInviteForm: React.FC<PartnerInviteFormProps> = ({
  onSubmit, loading, error, success, className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: PARTNER_TYPES[0].value
  })

  const [localError, setLocalError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    if (!form.name || !form.email || !form.phone || !form.type) {
      setLocalError(t("common.requiredFields"))
      return
    }
    try {
      await onSubmit(form)
    } catch (err: any) {
      setLocalError(err.message || t("common.unknownError"))
    }
  }

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"

  return (
    <form
      className={clsx("rounded-lg shadow border p-6 max-w-lg mx-auto space-y-4", bg, border, className)}
      onSubmit={handleSubmit}
    >
      <h2 className={clsx("flex items-center gap-2 text-lg font-semibold mb-2", text)}>
        <FaUserPlus /> {t("vendor.invitePartner")}
      </h2>

      <div className="flex flex-col">
        <label htmlFor="name" className={clsx("font-medium mb-1", text)}>
          {t("common.name")}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className={clsx("px-3 py-2 rounded border focus:outline-none", border, bg, text)}
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className={clsx("font-medium mb-1", text)}>
          {t("common.email")}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={clsx("px-3 py-2 rounded border focus:outline-none", border, bg, text)}
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone" className={clsx("font-medium mb-1", text)}>
          {t("common.phone")}
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className={clsx("px-3 py-2 rounded border focus:outline-none", border, bg, text)}
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="type" className={clsx("font-medium mb-1", text)}>
          {t("vendor.partnerType.label")}
        </label>
        <select
          name="type"
          id="type"
          className={clsx("px-3 py-2 rounded border focus:outline-none", border, bg, text)}
          value={form.type}
          onChange={handleChange}
        >
          {PARTNER_TYPES.map(pt => (
            <option key={pt.value} value={pt.value}>
              {t(pt.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {(localError || error) && (
        <div className="text-sm text-red-500">{localError || error}</div>
      )}
      {success && <div className="text-sm text-green-500">{success}</div>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-[--color-primary] text-white font-medium disabled:opacity-60"
          disabled={loading}
        >
          {loading ? t("common.submitting") : t("vendor.invite")}
        </button>
      </div>
    </form>
  )
}

export default PartnerInviteForm
