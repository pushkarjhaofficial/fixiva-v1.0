import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa"

export interface FranchiseBranch {
  id: string
  name: string
  manager: string
  contact: string
  address: string
  status: "active" | "inactive"
}

export interface FranchiseBranchTableProps {
  branches: FranchiseBranch[]
  onSelect?: (id: string) => void
  className?: string
}

const FranchiseBranchTable: React.FC<FranchiseBranchTableProps> = ({
  branches, onSelect, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaMapMarkerAlt /> Franchise Branches
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Manager</th>
              <th className="px-3 py-2 text-left">Contact</th>
              <th className="px-3 py-2 text-left">Address</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {branches.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("text-center py-6", subText)}>No branches.</td>
              </tr>
            ) : (
              branches.map(branch => (
                <tr
                  key={branch.id}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer"
                  onClick={() => onSelect?.(branch.id)}
                >
                  <td className="px-3 py-2">{branch.name}</td>
                  <td className="px-3 py-2">{branch.manager}</td>
                  <td className="px-3 py-2">
                    <a href={`tel:${branch.contact}`} className="text-blue-600 flex items-center gap-1">
                      <FaPhone /> {branch.contact}
                    </a>
                  </td>
                  <td className="px-3 py-2">{branch.address}</td>
                  <td className="px-3 py-2">{branch.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default FranchiseBranchTable
