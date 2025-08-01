import React from "react"
import clsx from "clsx"
import { FaFileContract, FaFileUpload } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface Tender {
  id: string
  title: string
  department: string
  budget: number
  status: "open" | "closed" | "awarded"
  submissionDeadline: string
  submissions: number
}

export interface GovtTenderPanelProps {
  tenders: Tender[]
  onSubmit: (id: string) => void
  onView?: (id: string) => void
  className?: string
}

const GovtTenderPanel: React.FC<GovtTenderPanelProps> = ({
  tenders, onSubmit, onView, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaFileContract /> Government Tenders
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Dept</th>
              <th className="px-3 py-2 text-left">Budget</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Deadline</th>
              <th className="px-3 py-2 text-left">Submissions</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tenders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">No tenders.</td>
              </tr>
            ) : (
              tenders.map(tender => (
                <tr key={tender.id}>
                  <td className="px-3 py-2">{tender.title}</td>
                  <td className="px-3 py-2">{tender.department}</td>
                  <td className="px-3 py-2">{tender.budget.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</td>
                  <td className="px-3 py-2">{tender.status}</td>
                  <td className="px-3 py-2">{new Date(tender.submissionDeadline).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{tender.submissions}</td>
                  <td className="px-3 py-2">
                    <button
                      className="px-3 py-1 rounded bg-blue-600 text-white text-xs"
                      onClick={() => onSubmit(tender.id)}
                      disabled={tender.status !== "open"}
                    ><FaFileUpload /> Submit</button>
                    <button
                      className="ml-2 px-3 py-1 rounded bg-gray-400 text-gray-800 text-xs"
                      onClick={() => onView?.(tender.id)}
                    >View</button>
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
export default GovtTenderPanel
