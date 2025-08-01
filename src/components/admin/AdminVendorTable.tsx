// src/components/admin/AdminVendorTable.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaTools, FaCheck, FaTimes, FaUserShield, FaExclamation } from "react-icons/fa"

export interface AdminVendor {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "pending" | "blocked"
  createdAt: string
}

export interface AdminVendorTableProps {
  vendors: AdminVendor[]
  onSelect?: (vendorId: string) => void
  className?: string
}

const AdminVendorTable: React.FC<AdminVendorTableProps> = ({
  vendors,
  onSelect,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  const getStatusIcon = (status: AdminVendor["status"]) => {
    switch (status) {
      case "active":
        return <FaCheck className="text-green-600 inline mr-1" />
      case "blocked":
        return <FaTimes className="text-red-600 inline mr-1" />
      case "pending":
        return <FaExclamation className="text-yellow-500 inline mr-1" />
      default:
        return null
    }
  }

  return (
    <section
      className={clsx("rounded-lg shadow border p-6", cardBg, className)}
      aria-labelledby="admin-vendor-table-title"
    >
      <h2
        id="admin-vendor-table-title"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaTools /> {t("admin.vendors") || "All Vendors"}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b">
            <tr className={text}>
              <th className="px-3 py-2 text-left">{t("common.name")}</th>
              <th className="px-3 py-2 text-left">{t("common.email")}</th>
              <th className="px-3 py-2 text-left">{t("common.phone")}</th>
              <th className="px-3 py-2 text-left">{t("common.status")}</th>
              <th className="px-3 py-2 text-left">{t("common.createdAt")}</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("text-center py-6", subText)}>
                  {t("admin.noVendors") || "No vendors found."}
                </td>
              </tr>
            ) : (
              vendors.map((v) => (
                <tr
                  key={v.id}
                  tabIndex={0}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                  onClick={() => onSelect?.(v.id)}
                  onKeyDown={(e) => e.key === "Enter" && onSelect?.(v.id)}
                >
                  <td className="px-3 py-2">{v.name}</td>
                  <td className="px-3 py-2">{v.email}</td>
                  <td className="px-3 py-2">{v.phone}</td>
                  <td className="px-3 py-2 capitalize">
                    {getStatusIcon(v.status)}
                    {t(`status.${v.status}`) || v.status}
                  </td>
                  <td className="px-3 py-2">
                    {new Date(v.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminVendorTable
