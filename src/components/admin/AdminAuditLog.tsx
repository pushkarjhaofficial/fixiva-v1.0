// src/components/admin/AdminAuditLog.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaHistory } from "react-icons/fa"

export interface AuditLogItem {
  id: string
  timestamp: string // ISO string
  actor: string
  action: string
  entity: string
  details?: string
}

export interface AdminAuditLogProps {
  logs: AuditLogItem[]
  className?: string
}

const AdminAuditLog: React.FC<AdminAuditLogProps> = ({ logs, className }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const bg = isDark ? "bg-gray-900" : "bg-white"
  const text = isDark ? "text-white" : "text-gray-900"
  const subText = isDark ? "text-gray-400" : "text-gray-500"
  const border = isDark ? "border-gray-700" : "border-gray-200"

  return (
    <section
      aria-labelledby="admin-audit-log-title"
      className={clsx("rounded-lg shadow border p-6", bg, border, className)}
    >
      <h2
        id="admin-audit-log-title"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaHistory aria-hidden /> Audit Log
      </h2>

      <ul role="list" className="space-y-3">
        {logs.length === 0 ? (
          <li
            className={clsx("text-center text-sm", subText)}
            aria-live="polite"
          >
            No audit records found.
          </li>
        ) : (
          logs.map((log) => (
            <li
              key={log.id}
              role="listitem"
              className={clsx(
                "flex flex-col rounded p-3",
                "bg-[--color-bg-secondary] border border-[--color-border]"
              )}
            >
              <div className={clsx("font-semibold", text)}>
                {log.action} <span className="font-normal">{log.entity}</span>
              </div>

              <div className={clsx("text-xs mt-1", subText)}>
                <time dateTime={log.timestamp}>
                  {new Date(log.timestamp).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
                {" • "}
                {log.actor}
                {log.details && <> • {log.details}</>}
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default AdminAuditLog
