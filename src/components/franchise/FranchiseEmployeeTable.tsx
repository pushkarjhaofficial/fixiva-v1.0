import React from "react"
import clsx from "clsx"
import { FaUserTie, FaCheck, FaTimes } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface FranchiseEmployee {
  id: string
  name: string
  role: string
  contact: string
  email: string
  branch: string
  status: "active" | "inactive"
}

export interface FranchiseEmployeeTableProps {
  employees: FranchiseEmployee[]
  onActivate?: (id: string) => void
  onDeactivate?: (id: string) => void
  className?: string
}

const FranchiseEmployeeTable: React.FC<FranchiseEmployeeTableProps> = ({
  employees, onActivate, onDeactivate, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaUserTie /> Franchise Employees
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Branch</th>
              <th className="px-3 py-2 text-left">Contact</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={7} className={clsx("text-center py-6", subText)}>No employees.</td>
              </tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.id}>
                  <td className="px-3 py-2">{emp.name}</td>
                  <td className="px-3 py-2">{emp.role}</td>
                  <td className="px-3 py-2">{emp.branch}</td>
                  <td className="px-3 py-2">{emp.contact}</td>
                  <td className="px-3 py-2">{emp.email}</td>
                  <td className="px-3 py-2">{emp.status}</td>
                  <td className="px-3 py-2 flex gap-1">
                    {emp.status === "inactive" && (
                      <button
                        className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                        onClick={() => onActivate?.(emp.id)}
                      >
                        <FaCheck /> Activate
                      </button>
                    )}
                    {emp.status === "active" && (
                      <button
                        className="px-2 py-1 rounded bg-red-600 text-white text-xs"
                        onClick={() => onDeactivate?.(emp.id)}
                      >
                        <FaTimes /> Deactivate
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
export default FranchiseEmployeeTable
