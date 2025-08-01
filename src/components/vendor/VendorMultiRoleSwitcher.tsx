import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaExchangeAlt } from "react-icons/fa"

export interface RoleOption {
  value: string
  label: string
}

export interface VendorMultiRoleSwitcherProps {
  currentRole: string
  roles: RoleOption[]
  onSwitch: (role: string) => void
  className?: string
}

const VendorMultiRoleSwitcher: React.FC<VendorMultiRoleSwitcherProps> = ({
  currentRole, roles, onSwitch, className
}) => {
  const { theme } = useTheme()
  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded shadow border p-4 flex gap-3 items-center", bg, className)}>
      <FaExchangeAlt className="text-xl" />
      <select
        value={currentRole}
        onChange={e => onSwitch(e.target.value)}
        className={clsx("px-2 py-1 rounded border", text)}
      >
        {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
      </select>
    </div>
  )
}
export default VendorMultiRoleSwitcher
