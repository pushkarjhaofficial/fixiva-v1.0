// src/components/layout/Sidebar.tsx

import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import clsx from "clsx"
import useAuth  from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { FixivaRole } from "@/context/AuthContext"

// Re-use the same nav map as Header
const roleNav: Record<FixivaRole, { to: string; label: string; icon?: React.ReactNode }[]> = {
  customer: [
    { to: "/booking", label: "Book Service" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/recycle", label: "Recycle" },
    { to: "/chat", label: "Chat" },
  ],
  vendor: [
    { to: "/vendor/jobs", label: "My Jobs" },
    { to: "/vendor/calendar", label: "Calendar" },
  ],
  admin: [
    { to: "/admin/dashboard", label: "Admin Panel" },
    { to: "/admin/logs", label: "Logs" },
  ],
  corp_admin: [
    { to: "/corp/dashboard", label: "Corp Dashboard" },
    { to: "/corp/csr", label: "CSR Tracker" },
  ],
  corp_employee: [{ to: "/corp/my-assets", label: "My Assets" }],
  govt_officer: [{ to: "/govt/assets", label: "PSU Disposal" }],
  govt_contractor: [
    { to: "/govt/contractor", label: "Contractor Bookings" },
  ],
  govt_employee: [
    { to: "/govt/employee", label: "Employee Bookings" },
  ],
  vendor_partner: [
    { to: "/vendor/partner", label: "Partner Dashboard" },
  ],
  recycle_agent: [
    { to: "/recycle-agent/routes", label: "My Pickups" },
  ],
  client_partner: [
    { to: "/partner/dashboard", label: "Partner Panel" },
  ],
  support_agent: [
    { to: "/support/tickets", label: "Support Tickets" },
  ],
  auditor: [{ to: "/audit/logs", label: "Audit Logs" }],
  franchise_owner: [
    { to: "/franchise/overview", label: "Franchise Panel" },
  ],
}

export interface SidebarProps {
  /** Whether the sidebar starts expanded */
  defaultOpen?: boolean
  /** Additional class names */
  className?: string
}

/**
 * Sidebar
 * Collapsible, role-aware navigation sidebar.
 */
const Sidebar: React.FC<SidebarProps> = ({
  defaultOpen = true,
  className,
}) => {
  const { role } = useAuth()
  const { theme } = useTheme()
  const [open, setOpen] = useState(defaultOpen)

  const links = roleNav[role as FixivaRole] ?? roleNav.customer

  const sidebarBg = "bg-[--color-bg-secondary]"
  const sidebarText = "text-[--color-text]"
  const activeBg = "bg-[--color-primary]/10"
  const activeText = "text-[--color-primary]"

  return (
    <aside
      className={clsx(
        sidebarBg,
        sidebarText,
        "flex-shrink-0 h-full transition-all duration-200 ease-in-out",
        open ? "w-64" : "w-16",
        className
      )}
      aria-label="Sidebar navigation"
    >
      <div className="h-full flex flex-col">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          className="self-end p-2 focus:outline-none"
        >
          {open ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        <nav className="flex-1 overflow-y-auto">
          {links.map(({ to, label, icon }, idx) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-4 py-2 transition-colors",
                  isActive ? activeBg : "hover:bg-[--color-bg] hover:bg-opacity-20",
                  isActive ? activeText : "text-current"
                )
              }
            >
              {/* Optional icon slot */}
              {icon && <span className="text-lg">{icon}</span>}
              {open && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 text-xs text-center text-gray-500">
          {open ? "v1.0.0" : "1.0.0"}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
