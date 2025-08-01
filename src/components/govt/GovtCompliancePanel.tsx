import React from "react"
import clsx from "clsx"
import { FaFileAlt, FaDownload, FaHistory } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface ComplianceDoc {
  id: string
  title: string
  description: string
  url: string
  uploadedAt: string
  version: string
  uploader: string
}

export interface GovtCompliancePanelProps {
  docs: ComplianceDoc[]
  onViewHistory?: (id: string) => void
  className?: string
}

const GovtCompliancePanel: React.FC<GovtCompliancePanelProps> = ({
  docs, onViewHistory, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaFileAlt /> Compliance, Policy & Circulars
      </h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Title</th>
            <th className="px-2 py-1 text-left">Description</th>
            <th className="px-2 py-1 text-left">Version</th>
            <th className="px-2 py-1 text-left">Uploaded At</th>
            <th className="px-2 py-1 text-left">Uploader</th>
            <th className="px-2 py-1 text-left">Doc</th>
            <th className="px-2 py-1 text-left">History</th>
          </tr>
        </thead>
        <tbody>
          {docs.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-6">No docs.</td>
            </tr>
          ) : (
            docs.map(doc => (
              <tr key={doc.id}>
                <td className="px-2 py-1">{doc.title}</td>
                <td className="px-2 py-1">{doc.description}</td>
                <td className="px-2 py-1">{doc.version}</td>
                <td className="px-2 py-1">{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                <td className="px-2 py-1">{doc.uploader}</td>
                <td className="px-2 py-1">
                  <a href={doc.url} className="text-blue-700 underline flex items-center gap-1" download>
                    <FaDownload /> Download
                  </a>
                </td>
                <td className="px-2 py-1">
                  <button className="text-xs underline text-gray-600 flex items-center gap-1"
                    onClick={() => onViewHistory?.(doc.id)}>
                    <FaHistory /> View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
export default GovtCompliancePanel
