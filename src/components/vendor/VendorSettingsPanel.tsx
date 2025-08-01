import React, { useState } from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaUserCog, FaLock, FaEnvelope, FaUniversity } from "react-icons/fa"

export interface VendorSettingsPanelProps {
  profile: {
    name: string
    email: string
    phone: string
    bankAccount?: string
    ifsc?: string
  }
  onUpdate: (fields: Partial<VendorSettingsPanelProps["profile"]>) => Promise<void>
  loading?: boolean
  error?: string
  success?: string
  className?: string
}

const VendorSettingsPanel: React.FC<VendorSettingsPanelProps> = ({
  profile, onUpdate, loading, error, success, className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [fields, setFields] = useState(profile)
  const [dirty, setDirty] = useState(false)
  const [localErr, setLocalErr] = useState<string | null>(null)

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
    setDirty(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalErr(null)
    try {
      await onUpdate(fields)
      setDirty(false)
    } catch (err: any) {
      setLocalErr(err.message || "Unknown error")
    }
  }

  return (
    <form className={clsx("rounded-lg shadow border p-6 max-w-lg mx-auto", bg, border, className)} onSubmit={handleSubmit}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaUserCog /> {t("vendor.settings") || "Settings"}
      </h2>
      <div className="flex flex-col mb-3">
        <label className={clsx("mb-1", text)} htmlFor="name">{t("common.name")}</label>
        <input type="text" name="name" value={fields.name} onChange={handleChange} className={clsx("border rounded px-2 py-1", border, text)} />
      </div>
      <div className="flex flex-col mb-3">
        <label className={clsx("mb-1", text)} htmlFor="email"><FaEnvelope className="inline" /> {t("common.email")}</label>
        <input type="email" name="email" value={fields.email} onChange={handleChange} className={clsx("border rounded px-2 py-1", border, text)} />
      </div>
      <div className="flex flex-col mb-3">
        <label className={clsx("mb-1", text)} htmlFor="phone">{t("common.phone")}</label>
        <input type="tel" name="phone" value={fields.phone} onChange={handleChange} className={clsx("border rounded px-2 py-1", border, text)} />
      </div>
      <div className="flex flex-col mb-3">
        <label className={clsx("mb-1", text)} htmlFor="bankAccount"><FaUniversity className="inline" /> {t("vendor.bankAccount")}</label>
        <input type="text" name="bankAccount" value={fields.bankAccount || ""} onChange={handleChange} className={clsx("border rounded px-2 py-1", border, text)} />
      </div>
      <div className="flex flex-col mb-3">
        <label className={clsx("mb-1", text)} htmlFor="ifsc">{t("vendor.ifsc") || "IFSC Code"}</label>
        <input type="text" name="ifsc" value={fields.ifsc || ""} onChange={handleChange} className={clsx("border rounded px-2 py-1", border, text)} />
      </div>
      {(localErr || error) && <div className="text-sm text-red-500">{localErr || error}</div>}
      {success && <div className="text-sm text-green-500">{success}</div>}
      <div className="flex justify-end">
        <button type="submit" className="px-5 py-2 rounded-lg bg-[--color-primary] text-white font-medium disabled:opacity-60" disabled={loading || !dirty}>
          {loading ? t("common.saving") : t("common.save")}
        </button>
      </div>
    </form>
  )
}
export default VendorSettingsPanel
