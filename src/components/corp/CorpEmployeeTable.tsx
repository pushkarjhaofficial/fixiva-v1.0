import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaUser } from "react-icons/fa"

export interface CorpEmployee {
  id: string
  name: string
  email: string
  phone?: string
  department: string
  assetsAssigned: number
  status: "active" | "inactive"
}
export interface CorpEmployeeTableProps {
  employees: CorpEmployee[]
  onSelect?: (id: string) => void
  className?: string
}
const CorpEmployeeTable: React.FC<CorpEmployeeTableProps> = ({
  employees, onSelect, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaUser /> Corporate Employees
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Department</th>
              <th className="px-3 py-2 text-left">Assets Assigned</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("text-center py-6", subText)}>No employees.</td>
              </tr>
            ) : (
              employees.map(emp => (
                <tr
                  key={emp.id}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer"
                  onClick={() => onSelect?.(emp.id)}
                >
                  <td className="px-3 py-2">{emp.name}</td>
                  <td className="px-3 py-2">{emp.email}</td>
                  <td className="px-3 py-2">{emp.department}</td>
                  <td className="px-3 py-2">{emp.assetsAssigned}</td>
                  <td className="px-3 py-2">{emp.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default CorpEmployeeTable
