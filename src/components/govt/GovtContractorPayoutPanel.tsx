import React from "react"
import clsx from "clsx"
import { FaMoneyCheck, FaFilePdf, FaFileCsv } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface ContractorPayout {
  id: string
  contractor: string
  amount: number
  status: "pending" | "approved" | "paid"
  approvedBy?: string
  paymentDate?: string
  bankDetails?: string
}

export interface GovtContractorPayoutPanelProps {
  payouts: ContractorPayout[]
  onApprove: (id: string) => void
  onExportPDF: () => void
  onExportCSV: () => void
  className?: string
}

const GovtContractorPayoutPanel: React.FC<GovtContractorPayoutPanelProps> = ({
  payouts, onApprove, onExportPDF, onExportCSV, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaMoneyCheck /> Contractor Payouts
        </h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1"
            onClick={onExportPDF}>
            <FaFilePdf /> PDF
          </button>
          <button className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-1"
            onClick={onExportCSV}>
            <FaFileCsv /> CSV
          </button>
        </div>
      </div>
      <table className="min-w-full text-sm mb-4">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Contractor</th>
            <th className="px-2 py-1 text-left">Amount</th>
            <th className="px-2 py-1 text-left">Status</th>
            <th className="px-2 py-1 text-left">Bank Details</th>
            <th className="px-2 py-1 text-left">Approved By</th>
            <th className="px-2 py-1 text-left">Payment Date</th>
            <th className="px-2 py-1 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {payouts.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-6">No payouts.</td>
            </tr>
          ) : (
            payouts.map(p => (
              <tr key={p.id}>
                <td className="px-2 py-1">{p.contractor}</td>
                <td className="px-2 py-1">{p.amount.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</td>
                <td className="px-2 py-1">{p.status}</td>
                <td className="px-2 py-1">{p.bankDetails || "-"}</td>
                <td className="px-2 py-1">{p.approvedBy || "-"}</td>
                <td className="px-2 py-1">{p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "-"}</td>
                <td className="px-2 py-1">
                  {p.status === "pending" && (
                    <button
                      className="px-2 py-1 rounded bg-blue-600 text-white text-xs"
                      onClick={() => onApprove(p.id)}
                    >Approve</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
export default GovtContractorPayoutPanel
