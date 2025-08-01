import React from "react"
import clsx from "clsx"
import { FaClipboardCheck, FaCheck, FaTimes } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface GovtBulkApprovalItem {
  id: string
  type: "asset" | "booking"
  label: string
  requester: string
  date: string
  status: "pending" | "approved" | "rejected"
}

export interface GovtBulkApprovalPanelProps {
  items: GovtBulkApprovalItem[]
  onApprove: (ids: string[]) => void
  onReject: (ids: string[]) => void
  className?: string
}

const GovtBulkApprovalPanel: React.FC<GovtBulkApprovalPanelProps> = ({
  items, onApprove, onReject, className
}) => {
  const { theme } = useTheme()
  const [selected, setSelected] = React.useState<string[]>([])
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaClipboardCheck /> Bulk Approval
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Select</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Label</th>
              <th className="px-3 py-2 text-left">Requester</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">Nothing pending.</td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id}>
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => toggle(item.id)}
                    />
                  </td>
                  <td className="px-3 py-2">{item.type}</td>
                  <td className="px-3 py-2">{item.label}</td>
                  <td className="px-3 py-2">{item.requester}</td>
                  <td className="px-3 py-2">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex gap-3 mt-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => onApprove(selected)}
            disabled={selected.length === 0}
          >
            <FaCheck /> Approve Selected
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => onReject(selected)}
            disabled={selected.length === 0}
          >
            <FaTimes /> Reject Selected
          </button>
        </div>
      </div>
    </div>
  )
}
export default GovtBulkApprovalPanel
