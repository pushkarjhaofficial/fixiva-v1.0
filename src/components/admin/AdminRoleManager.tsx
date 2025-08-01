// src/components/admin/AdminRoleManager.tsx

import React from "react"
import clsx from "clsx"
import { FaUserShield, FaTrash, FaEdit } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface AdminRole {
  id: string
  name: string
  description?: string
  userCount?: number
}

export interface AdminRoleManagerProps {
  roles: AdminRole[]
  onEdit?: (roleId: string) => void
  onDelete?: (roleId: string) => void
  className?: string
}

const AdminRoleManager: React.FC<AdminRoleManagerProps> = ({
  roles,
  onEdit,
  onDelete,
  className
}) => {
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"

  return (
    <section
      className={clsx("rounded-lg shadow border p-6", cardBg, border, className)}
      aria-labelledby="admin-role-manager-title"
    >
      <h2
        id="admin-role-manager-title"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaUserShield aria-hidden /> Role Manager
      </h2>

      <ul className="space-y-4">
        {roles.length === 0 ? (
          <li className={clsx("text-center text-sm", subText)}>No roles yet.</li>
        ) : (
          roles.map((r) => (
            <li
              key={r.id}
              className={clsx("border rounded p-3 flex justify-between items-center", border)}
            >
              <div className={clsx("space-y-1", text)}>
                <div className="font-bold">{r.name}</div>
                {r.description && <div className="text-xs">{r.description}</div>}
                {typeof r.userCount === "number" && (
                  <div className="text-xs">{r.userCount} user{r.userCount !== 1 ? "s" : ""}</div>
                )}
              </div>

              {(onEdit || onDelete) && (
                <div className="flex gap-2 text-sm">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(r.id)}
                      aria-label={`Edit role ${r.name}`}
                      className="p-1 rounded hover:bg-[--color-bg-hover] transition"
                    >
                      <FaEdit />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(r.id)}
                      aria-label={`Delete role ${r.name}`}
                      className="p-1 text-red-500 rounded hover:bg-red-100 dark:hover:bg-red-800 transition"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default AdminRoleManager
