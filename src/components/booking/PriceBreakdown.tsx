// src/components/booking/PriceBreakdown.tsx

import React from "react"

export interface PriceBreakdownItem {
  label: string
  amount: number
}

export interface PriceBreakdownProps {
  items: PriceBreakdownItem[]
  total: number
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ items, total }) => {
  return (
    <div className="w-full space-y-2 rounded border p-4 bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Price Breakdown</h3>
      <ul className="text-sm space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span>{item.label}</span>
            <span>₹{item.amount.toFixed(2)}</span>
          </li>
        ))}
        <li className="border-t mt-2 pt-2 flex justify-between font-bold text-primary-700 dark:text-primary-300">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  )
}

export default PriceBreakdown
