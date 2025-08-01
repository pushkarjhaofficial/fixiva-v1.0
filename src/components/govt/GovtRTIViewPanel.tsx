import React, { useState } from "react"
import clsx from "clsx"
import { FaSearch, FaEye, FaListAlt } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface GovtRTIViewEntry {
  id: string
  type: "disposal" | "contract" | "audit" | "booking"
  summary: string
  department: string
  date: string
  publicDocUrl?: string
}

export interface GovtRTIViewPanelProps {
  entries: GovtRTIViewEntry[]
  className?: string
}

const GovtRTIViewPanel: React.FC<GovtRTIViewPanelProps> = ({
  entries, className
}) => {
  const { theme } = useTheme()
  const [q, setQ] = useState("")
  const filtered = entries.filter(e =>
    e.summary.toLowerCase().includes(q.toLowerCase()) ||
    e.department.toLowerCase().includes(q.toLowerCase())
  )
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaListAlt /> Public RTI/Transparency Panel
      </h2>
      <div className="flex items-center mb-2">
        <FaSearch className="mr-2 text-gray-400" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
          placeholder="Search by summary or department"
        />
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Type</th>
            <th className="px-2 py-1 text-left">Summary</th>
            <th className="px-2 py-1 text-left">Dept</th>
            <th className="px-2 py-1 text-left">Date</th>
            <th className="px-2 py-1 text-left">Doc</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-400 py-6">No data.</td>
            </tr>
          ) : (
            filtered.map(entry => (
              <tr key={entry.id}>
                <td className="px-2 py-1">{entry.type}</td>
                <td className="px-2 py-1">{entry.summary}</td>
                <td className="px-2 py-1">{entry.department}</td>
                <td className="px-2 py-1">{new Date(entry.date).toLocaleDateString()}</td>
                <td className="px-2 py-1">
                  {entry.publicDocUrl ? (
                    <a href={entry.publicDocUrl} target="_blank" rel="noopener noreferrer"
                      className="text-blue-600 underline flex items-center gap-1"
                    ><FaEye /> View</a>
                  ) : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
export default GovtRTIViewPanel
