import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaHandHoldingUsd } from "react-icons/fa"

export interface CorpVendor {
  id: string
  name: string
  email: string
  services: string
  assignedAssets: number
  status: "active" | "inactive"
}
export interface CorpVendorTableProps {
  vendors: CorpVendor[]
  onSelect?: (id: string) => void
  className?: string
}
const CorpVendorTable: React.FC<CorpVendorTableProps> = ({
  vendors, onSelect, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaHandHoldingUsd /> Vendors
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Services</th>
              <th className="px-3 py-2 text-left">Assets Assigned</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("text-center py-6", subText)}>No vendors.</td>
              </tr>
            ) : (
              vendors.map(v => (
                <tr
                  key={v.id}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer"
                  onClick={() => onSelect?.(v.id)}
                >
                  <td className="px-3 py-2">{v.name}</td>
                  <td className="px-3 py-2">{v.email}</td>
                  <td className="px-3 py-2">{v.services}</td>
                  <td className="px-3 py-2">{v.assignedAssets}</td>
                  <td className="px-3 py-2">{v.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default CorpVendorTable
