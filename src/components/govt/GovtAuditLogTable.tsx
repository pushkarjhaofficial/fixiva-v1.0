import React from "react"
import clsx from "clsx"
import { FaBook, FaDownload, FaHistory } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface GovtAuditLog {
  id: string
  action: string
  user: string
  role: string
  entity: string
  entityId: string
  time: string
  details?: string
}

export interface GovtAuditLogTableProps {
  logs: GovtAuditLog[]
  onExport?: () => void
  className?: string
}

const GovtAuditLogTable: React.FC<GovtAuditLogTableProps> = ({
  logs, onExport, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaBook /> Audit Logs
        <button
          className="ml-auto px-3 py-1 rounded bg-[--color-primary] text-white flex items-center gap-1"
          onClick={onExport}
        ><FaDownload /> Export</button>
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2 text-left">User</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Action</th>
              <th className="px-3 py-2 text-left">Entity</th>
              <th className="px-3 py-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">No logs.</td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id}>
                  <td className="px-3 py-2">{new Date(log.time).toLocaleString()}</td>
                  <td className="px-3 py-2">{log.user}</td>
                  <td className="px-3 py-2">{log.role}</td>
                  <td className="px-3 py-2">{log.action}</td>
                  <td className="px-3 py-2">{log.entity} ({log.entityId})</td>
                  <td className="px-3 py-2">{log.details || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default GovtAuditLogTable
