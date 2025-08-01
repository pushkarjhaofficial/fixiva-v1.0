import React from "react"
import clsx from "clsx"
import { FaTools, FaUserTie, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface GovtContractorBooking {
  id: string
  service: string
  location: string
  requestedBy: string
  assignedContractor: string
  scheduled: string
  status: "pending" | "scheduled" | "in_progress" | "completed" | "escalated"
  paymentStatus: "unpaid" | "paid"
  slaMinutes: number
  overdue: boolean
}

export interface GovtContractorBookingTableProps {
  bookings: GovtContractorBooking[]
  onEscalate?: (id: string) => void
  onView?: (id: string) => void
  className?: string
}

const GovtContractorBookingTable: React.FC<GovtContractorBookingTableProps> = ({
  bookings, onEscalate, onView, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaTools /> Govt Contractor Jobs
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Service</th>
              <th className="px-3 py-2 text-left">Location</th>
              <th className="px-3 py-2 text-left">Requested By</th>
              <th className="px-3 py-2 text-left">Contractor</th>
              <th className="px-3 py-2 text-left">Scheduled</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Payment</th>
              <th className="px-3 py-2 text-left">SLA (min)</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">No jobs.</td>
              </tr>
            ) : (
              bookings.map(job => (
                <tr key={job.id}>
                  <td className="px-3 py-2">{job.service}</td>
                  <td className="px-3 py-2">{job.location}</td>
                  <td className="px-3 py-2">{job.requestedBy}</td>
                  <td className="px-3 py-2 flex items-center gap-2"><FaUserTie /> {job.assignedContractor}</td>
                  <td className="px-3 py-2">{new Date(job.scheduled).toLocaleString()}</td>
                  <td className="px-3 py-2">
                    {job.status}
                    {job.overdue && <FaExclamationTriangle className="inline text-red-600 ml-1" title="SLA Overdue" />}
                  </td>
                  <td className="px-3 py-2">{job.paymentStatus === "paid"
                    ? <span className="text-green-600 font-semibold">Paid</span>
                    : <span className="text-red-500 font-semibold">Unpaid</span>
                  }</td>
                  <td className="px-3 py-2">{job.slaMinutes}</td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      className="px-2 py-1 rounded bg-blue-600 text-white text-xs"
                      onClick={() => onView?.(job.id)}
                    >View</button>
                    {["pending", "in_progress"].includes(job.status) && onEscalate && (
                      <button
                        className="px-2 py-1 rounded bg-pink-600 text-white text-xs"
                        onClick={() => onEscalate(job.id)}
                      >Escalate</button>
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
export default GovtContractorBookingTable
