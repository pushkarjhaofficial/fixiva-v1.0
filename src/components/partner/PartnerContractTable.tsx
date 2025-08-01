import React from "react"
import clsx from "clsx"
import { FaFileContract, FaDownload } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface PartnerContract {
  id: string
  title: string
  client: string
  startDate: string
  endDate: string
  value: number
  currency: string
  status: "active" | "expired" | "pending"
  fileUrl?: string
}

export interface PartnerContractTableProps {
  contracts: PartnerContract[]
  onDownload?: (id: string) => void
  className?: string
}

const PartnerContractTable: React.FC<PartnerContractTableProps> = ({
  contracts, onDownload, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaFileContract /> Partner Contracts
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Client</th>
              <th className="px-3 py-2 text-left">Start</th>
              <th className="px-3 py-2 text-left">End</th>
              <th className="px-3 py-2 text-left">Value</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">File</th>
            </tr>
          </thead>
          <tbody>
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={7} className={clsx("text-center py-6", subText)}>No contracts.</td>
              </tr>
            ) : (
              contracts.map(c => (
                <tr key={c.id}>
                  <td className="px-3 py-2">{c.title}</td>
                  <td className="px-3 py-2">{c.client}</td>
                  <td className="px-3 py-2">{new Date(c.startDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{new Date(c.endDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{c.currency} {c.value.toLocaleString()}</td>
                  <td className="px-3 py-2">{c.status}</td>
                  <td className="px-3 py-2">
                    {c.fileUrl ? (
                      <a
                        href={c.fileUrl}
                        download
                        className="px-2 py-1 bg-[--color-primary] text-white rounded flex items-center gap-1"
                        onClick={e => { e.stopPropagation(); onDownload?.(c.id); }}
                      >
                        <FaDownload /> Download
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
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
export default PartnerContractTable
