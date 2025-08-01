import React from "react"
import clsx from "clsx"
import { FaTruck, FaUser, FaCheck, FaTimes } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface PickupRequest {
  id: string
  asset: string
  requester: string
  date: string
  status: "scheduled" | "completed" | "cancelled"
  address: string
}
export interface RecyclePickupTableProps {
  pickups: PickupRequest[]
  onSelect?: (pickupId: string) => void
  className?: string
}
const RecyclePickupTable: React.FC<RecyclePickupTableProps> = ({
  pickups, onSelect, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaTruck /> Pickups
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Asset</th>
              <th className="px-3 py-2 text-left">Requester</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Address</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {pickups.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("text-center py-6", subText)}>No pickups yet.</td>
              </tr>
            ) : (
              pickups.map(p => (
                <tr key={p.id}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer"
                  onClick={() => onSelect?.(p.id)}>
                  <td className="px-3 py-2">{p.asset}</td>
                  <td className="px-3 py-2">{p.requester}</td>
                  <td className="px-3 py-2">{new Date(p.date).toLocaleString()}</td>
                  <td className="px-3 py-2">{p.address}</td>
                  <td className="px-3 py-2">
                    {p.status === "completed" && <FaCheck className="text-green-600 inline mr-1" />}
                    {p.status === "cancelled" && <FaTimes className="text-red-600 inline mr-1" />}
                    <span>{p.status}</span>
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
export default RecyclePickupTable
