// src/components/vendor/VendorNotificationsPanel.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaBell, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"

export interface NotificationItem {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  createdAt: string   // ISO string
  read?: boolean
}

export interface VendorNotificationsPanelProps {
  notifications: NotificationItem[]
  onMarkRead?: (id: string) => void
  className?: string
}

const ICONS = {
  info: <FaBell className="text-blue-400" />,
  success: <FaCheckCircle className="text-green-500" />,
  warning: <FaExclamationTriangle className="text-yellow-600" />,
  error: <FaExclamationTriangle className="text-red-500" />
}

/**
 * VendorNotificationsPanel
 * Modular, notification/inbox panel for vendors and partners (can be reused for admin/corp/govt).
 */
const VendorNotificationsPanel: React.FC<VendorNotificationsPanelProps> = ({
  notifications,
  onMarkRead,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <div className={clsx("rounded-lg shadow border p-6 max-w-lg mx-auto", bg, border, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaBell /> {t("vendor.notifications")}
      </h2>
      <ul className="space-y-4">
        {notifications.length === 0 ? (
          <li className={clsx("text-center text-sm", subText)}>{t("common.noNotifications")}</li>
        ) : (
          notifications.map((n) => (
            <li
              key={n.id}
              className={clsx(
                "flex items-start gap-3 rounded p-3",
                n.read ? "opacity-60" : "bg-[--color-bg-secondary]"
              )}
            >
              <div className="text-xl mt-1">{ICONS[n.type]}</div>
              <div className="flex-1">
                <div className={clsx("font-medium", text)}>{n.title}</div>
                <div className={clsx("text-sm", subText)}>{n.message}</div>
                <div className={clsx("text-xs mt-1", subText)}>
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
              {!n.read && onMarkRead && (
                <button
                  className="ml-2 px-3 py-1 rounded bg-[--color-primary] text-white text-xs font-semibold hover:opacity-80"
                  onClick={() => onMarkRead(n.id)}
                >
                  {t("common.markRead")}
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default VendorNotificationsPanel
