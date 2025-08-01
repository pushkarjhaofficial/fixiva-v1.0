import React from "react"
import clsx from "clsx"
import { FaCoins, FaRupeeSign, FaDollarSign, FaEuroSign } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface PartnerRevenuePanelProps {
  totalRevenue: number
  revenueCurrency: "INR" | "USD" | "EUR"
  thisMonth: number
  lastMonth: number
  className?: string
}

const currencyIcon = {
  INR: <FaRupeeSign />,
  USD: <FaDollarSign />,
  EUR: <FaEuroSign />,
}

const PartnerRevenuePanel: React.FC<PartnerRevenuePanelProps> = ({
  totalRevenue, revenueCurrency, thisMonth, lastMonth, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaCoins /> Partner Revenue
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-lg">
          <span>Total:</span>
          <span className="font-bold">{currencyIcon[revenueCurrency]} {totalRevenue.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-md">
          <span>This Month:</span>
          <span className="font-semibold">{currencyIcon[revenueCurrency]} {thisMonth.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-md">
          <span>Last Month:</span>
          <span className="font-semibold">{currencyIcon[revenueCurrency]} {lastMonth.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
export default PartnerRevenuePanel
