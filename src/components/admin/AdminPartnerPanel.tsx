// src/components/admin/AdminPartnerPanel.tsx

import React from "react"
import clsx from "clsx"
import { FaHandshake } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"

export interface Partner {
  id: string
  name: string
  email: string
  type: string
  joinedAt: string
  active: boolean
}

export interface AdminPartnerPanelProps {
  partners: Partner[]
  className?: string
}

const AdminPartnerPanel: React.FC<AdminPartnerPanelProps> = ({
  partners,
  className
}) => {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"

  return (
    <section
      className={clsx("rounded-lg shadow border p-6", cardBg, border, className)}
      aria-labelledby="admin-partner-panel"
    >
      <h2
        id="admin-partner-panel"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaHandshake aria-hidden />
        {t("admin.partners") || "Partners"}
      </h2>

      <ul className="space-y-4">
        {partners.length === 0 ? (
          <li className={clsx("text-center text-sm", subText)}>
            {t("admin.noPartners") || "No partners yet."}
          </li>
        ) : (
          partners.map((p) => (
            <li
              key={p.id}
              className={clsx("border rounded p-3 flex justify-between items-center", border, "bg-[--color-bg-secondary]")}
              aria-label={`Partner ${p.name}`}
            >
              <div>
                <div className={clsx("font-bold", text)}>{p.name}</div>
                <div className={clsx("text-xs", subText)}>{p.email}</div>
                <div className={clsx("text-xs", subText)}>
                  {p.type} &nbsp;|&nbsp;
                  {t("admin.joined")} {new Date(p.joinedAt).toLocaleDateString()}
                </div>
              </div>

              <span
                className={clsx(
                  "px-2 py-1 rounded text-xs font-bold",
                  p.active
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-700"
                )}
              >
                {p.active ? t("common.active") || "Active" : t("common.inactive") || "Inactive"}
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default AdminPartnerPanel
