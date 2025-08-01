import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaBox, FaCheck, FaTimes } from "react-icons/fa"

export interface CorpAsset {
  id: string
  type: string
  model: string
  serial: string
  owner: string
  assignedTo: string
  status: "active" | "retired" | "recycled" | "faulty"
  assignedDate?: string
}
export interface CorpAssetsTableProps {
  assets: CorpAsset[]
  onRetire?: (id: string) => void
  onRecycle?: (id: string) => void
  className?: string
}
const CorpAssetsTable: React.FC<CorpAssetsTableProps> = ({
  assets, onRetire, onRecycle, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaBox /> Corporate Assets
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Model</th>
              <th className="px-3 py-2 text-left">Serial</th>
              <th className="px-3 py-2 text-left">Owner</th>
              <th className="px-3 py-2 text-left">Assigned To</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Actions</th>
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
                  <td className="px-3 py-2">{a.model}</td>
                  <td className="px-3 py-2">{a.serial}</td>
                  <td className="px-3 py-2">{a.owner}</td>
                  <td className="px-3 py-2">{a.assignedTo}</td>
                  <td className="px-3 py-2">{a.status}</td>
                  <td className="px-3 py-2 flex gap-1">
                    <button
                      className="px-2 py-1 rounded bg-yellow-600 text-white text-xs"
                      onClick={() => onRetire?.(a.id)}
                      disabled={a.status !== "active"}
                    >
                      Retire
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                      onClick={() => onRecycle?.(a.id)}
                      disabled={a.status !== "retired"}
                    >
                      Recycle
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
export default CorpAssetsTable
