import React from "react"
import clsx from "clsx"
import { FaUser } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface PartnerCustomer {
  id: string
  name: string
  email: string
  phone: string
  jobs: number
  status: "active" | "inactive"
}

export interface PartnerCustomerTableProps {
  customers: PartnerCustomer[]
  onSelect?: (id: string) => void
  className?: string
}

const PartnerCustomerTable: React.FC<PartnerCustomerTableProps> = ({
  customers, onSelect, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaUser /> Customers
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Jobs</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("text-center py-6", subText)}>No customers.</td>
              </tr>
            ) : (
              customers.map(cust => (
                <tr key={cust.id}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer"
                  onClick={() => onSelect?.(cust.id)}>
                  <td className="px-3 py-2">{cust.name}</td>
                  <td className="px-3 py-2">{cust.email}</td>
                  <td className="px-3 py-2">{cust.phone}</td>
                  <td className="px-3 py-2">{cust.jobs}</td>
                  <td className="px-3 py-2">{cust.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default PartnerCustomerTable
