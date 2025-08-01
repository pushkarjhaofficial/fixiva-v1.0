// src/components/admin/AdminUserTable.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaUserShield, FaCheck, FaTimes, FaUser } from "react-icons/fa"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "blocked"
  createdAt: string
}

export interface AdminUserTableProps {
  users: AdminUser[]
  onSelect?: (userId: string) => void
  className?: string
}

const AdminUserTable: React.FC<AdminUserTableProps> = ({
  users,
  onSelect,
  className,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"

  const getStatusIcon = (status: AdminUser["status"]) => {
    if (status === "active") return <FaCheck className="text-green-600 inline mr-1" />
    if (status === "blocked") return <FaTimes className="text-red-600 inline mr-1" />
    return null
  }

  return (
    <section
      className={clsx("rounded-lg shadow border p-6", cardBg, className)}
      aria-labelledby="admin-user-table-title"
    >
      <h2
        id="admin-user-table-title"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaUserShield /> {t("admin.users") || "All Users"}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b">
            <tr className={text}>
              <th className="px-3 py-2 text-left">{t("common.name")}</th>
              <th className="px-3 py-2 text-left">{t("common.email")}</th>
              <th className="px-3 py-2 text-left">{t("common.role")}</th>
              <th className="px-3 py-2 text-left">{t("common.status")}</th>
              <th className="px-3 py-2 text-left">{t("common.createdAt")}</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("text-center py-6", subText)}>
                  {t("admin.noUsers") || "No users found."}
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  tabIndex={0}
                  onClick={() => onSelect?.(u.id)}
                  onKeyDown={(e) => e.key === "Enter" && onSelect?.(u.id)}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                >
                  <td className="px-3 py-2">{u.name}</td>
                  <td className="px-3 py-2">{u.email}</td>
                  <td className="px-3 py-2 capitalize">{u.role}</td>
                  <td className="px-3 py-2 capitalize">
                    {getStatusIcon(u.status)}
                    <span>{t(`status.${u.status}`) || u.status}</span>
                  </td>
                  <td className="px-3 py-2">
                    {new Date(u.createdAt).toLocaleString()}
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

export default AdminUserTable
