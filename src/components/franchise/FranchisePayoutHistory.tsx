import React from "react"
import clsx from "clsx"
import { FaWallet, FaFileInvoiceDollar } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface FranchisePayout {
  id: string
  month: string
  amount: number
  currency: string
  status: "paid" | "pending" | "on_hold"
  date: string
}

export interface FranchisePayoutHistoryProps {
  payouts: FranchisePayout[]
  className?: string
}

const FranchisePayoutHistory: React.FC<FranchisePayoutHistoryProps> = ({
  payouts, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaWallet /> Payout History
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Month</th>
              <th className="px-3 py-2 text-left">Amount</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {payouts.length === 0 ? (
              <tr>
                <td colSpan={4} className={clsx("text-center py-6", subText)}>No payouts.</td>
              </tr>
            ) : (
              payouts.map(payout => (
                <tr key={payout.id}>
                  <td className="px-3 py-2">{payout.month}</td>
                  <td className="px-3 py-2">{payout.currency} {payout.amount.toLocaleString()}</td>
                  <td className="px-3 py-2">{payout.status}</td>
                  <td className="px-3 py-2">{new Date(payout.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default FranchisePayoutHistory