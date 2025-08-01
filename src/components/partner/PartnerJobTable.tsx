import React from "react"
import clsx from "clsx"
import { FaTools, FaCheck } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface PartnerJob {
  id: string
  title: string
  customer: string
  status: "pending" | "active" | "completed" | "cancelled"
  startDate: string
  endDate?: string
}

export interface PartnerJobTableProps {
  jobs: PartnerJob[]
  onMarkComplete?: (id: string) => void
  className?: string
}

const PartnerJobTable: React.FC<PartnerJobTableProps> = ({
  jobs, onMarkComplete, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaTools /> Partner Jobs
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Customer</th>
              <th className="px-3 py-2 text-left">Start Date</th>
              <th className="px-3 py-2 text-left">End Date</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className={clsx("text-center py-6", subText)}>No jobs.</td>
              </tr>
            ) : (
              jobs.map(job => (
                <tr key={job.id}>
                  <td className="px-3 py-2">{job.title}</td>
                  <td className="px-3 py-2">{job.customer}</td>
                  <td className="px-3 py-2">{new Date(job.startDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{job.endDate ? new Date(job.endDate).toLocaleDateString() : "-"}</td>
                  <td className="px-3 py-2">{job.status}</td>
                  <td className="px-3 py-2">
                    {job.status !== "completed" && onMarkComplete && (
                      <button
                        className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                        onClick={() => onMarkComplete(job.id)}
                        disabled={job.status === "cancelled"}
                      >
                        <FaCheck /> Complete
                      </button>
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
export default PartnerJobTable
