import React from "react"
import clsx from "clsx"
import { FaFileAlt, FaUser, FaCheck, FaCommentDots } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface FileMovement {
  id: string
  fileNumber: string
  subject: string
  department: string
  status: "in_progress" | "approved" | "closed"
  lastMovedBy: string
  lastMovedAt: string
  notings: string[]
  attachments: { name: string; url: string }[]
}

export interface GovtEOfficeFileTrackingPanelProps {
  files: FileMovement[]
  className?: string
}

const GovtEOfficeFileTrackingPanel: React.FC<GovtEOfficeFileTrackingPanelProps> = ({
  files, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaFileAlt /> e-Office File Tracking
      </h2>
      <table className="min-w-full text-sm mb-4">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">File #</th>
            <th className="px-2 py-1 text-left">Subject</th>
            <th className="px-2 py-1 text-left">Dept</th>
            <th className="px-2 py-1 text-left">Status</th>
            <th className="px-2 py-1 text-left">Moved By</th>
            <th className="px-2 py-1 text-left">Last Moved</th>
            <th className="px-2 py-1 text-left">Notings</th>
            <th className="px-2 py-1 text-left">Attachments</th>
          </tr>
        </thead>
        <tbody>
          {files.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center text-gray-400 py-6">No files.</td>
            </tr>
          ) : (
            files.map(file => (
              <tr key={file.id}>
                <td className="px-2 py-1">{file.fileNumber}</td>
                <td className="px-2 py-1">{file.subject}</td>
                <td className="px-2 py-1">{file.department}</td>
                <td className="px-2 py-1">{file.status}</td>
                <td className="px-2 py-1">{file.lastMovedBy}</td>
                <td className="px-2 py-1">{new Date(file.lastMovedAt).toLocaleString()}</td>
                <td className="px-2 py-1">
                  {file.notings.map((n, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <FaCommentDots className="text-gray-400" /> {n}
                    </div>
                  ))}
                </td>
                <td className="px-2 py-1">
                  {file.attachments.map(a => (
                    <div key={a.url}>
                      <a href={a.url} download className="text-blue-600 underline flex items-center gap-1">
                        <FaFileAlt /> {a.name}
                      </a>
                    </div>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
export default GovtEOfficeFileTrackingPanel
