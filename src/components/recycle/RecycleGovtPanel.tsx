import React from "react"
import clsx from "clsx"
import { FaBuilding, FaCheck, FaTimes } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface GovtRecycleAsset {
  id: string
  type: string
  quantity: number
  submittedBy: string
  department: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
}
export interface RecycleGovtPanelProps {
  assets: GovtRecycleAsset[]
  onStatusChange?: (id: string, status: GovtRecycleAsset["status"]) => void
  className?: string
}
const RecycleGovtPanel: React.FC<RecycleGovtPanelProps> = ({
  assets, onStatusChange, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaBuilding /> Govt/PSU Recycle Panel
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Qty</th>
              <th className="px-3 py-2 text-left">Dept</th>
              <th className="px-3 py-2 text-left">Submitted By</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan={7} className={clsx("text-center py-6", subText)}>No assets.</td>
              </tr>
            ) : (
              assets.map(a => (
                <tr key={a.id}>
                  <td className="px-3 py-2">{a.type}</td>
                  <td className="px-3 py-2">{a.quantity}</td>
                  <td className="px-3 py-2">{a.department}</td>
                  <td className="px-3 py-2">{a.submittedBy}</td>
                  <td className="px-3 py-2">{new Date(a.submittedAt).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{a.status}</td>
                  <td className="px-3 py-2 flex gap-1">
                    <button className="px-2 py-1 rounded bg-green-600 text-white text-xs" onClick={() => onStatusChange?.(a.id, "approved")}>
                      <FaCheck />
                    </button>
                    <button className="px-2 py-1 rounded bg-red-600 text-white text-xs" onClick={() => onStatusChange?.(a.id, "rejected")}>
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default RecycleGovtPanel

