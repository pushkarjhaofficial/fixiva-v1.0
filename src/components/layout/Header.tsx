// src/components/shared/Header.tsx

import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import clsx from "clsx"
import useAuth  from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"
import useLanguage from "@/hooks/useLanguage"
import { FaBars, FaTimes } from "react-icons/fa"
import { FixivaRole } from "@/context/AuthContext"

const LOGO_URL = "/logo.svg"

// Full nav map for all Fixiva roles
const roleNav: Record<FixivaRole, { to: string; label: string }[]> = {
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

const Header: React.FC = () => {
  const { user, role, logout } = useAuth()
  const { theme, setTheme, emoji = "🎨" } = useTheme()
  const { lang, availableLanguages, switchLanguage } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Cycle through themes: light → glass → dark
  const toggleTheme = () => {
    if (theme === "light") setTheme("glass")
    else if (theme === "glass") setTheme("dark")
    else setTheme("light")
  }

  // Determine which links to show
  const links =
    roleNav[role as FixivaRole] ?? roleNav.customer

  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-md bg-[--color-bg] text-[--color-text] sticky top-0 z-50">
      {/* Logo + Mobile Toggle */}
      <div className="flex items-center gap-2">
        <button
          className="md:hidden text-xl focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img src={LOGO_URL} alt="Fixiva Logo" className="h-8 w-8" />
          <span className="font-bold text-lg tracking-wide">Fixiva</span>
        </Link>
      </div>

      {/* Nav Links */}
      <nav
        className={clsx(
          "flex-1 md:flex md:items-center md:justify-center gap-6",
          mobileOpen ? "block mt-4 space-y-2" : "hidden md:flex"
        )}
      >
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "px-2 py-1 rounded transition",
                isActive ? "font-semibold underline" : "hover:underline"
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="text-xl focus:outline-none"
          aria-label="Toggle Theme"
        >
          {emoji}
        </button>

        {/* Language Select */}
        <select
          value={lang}
          onChange={(e) => switchLanguage(e.target.value)}
          className="bg-transparent border rounded px-1 py-0.5"
          aria-label="Select Language"
        >
          {Object.entries(availableLanguages).map(([code, meta]) => (
            <option key={code} value={code}>
              {meta.flag} {meta.name}
            </option>
          ))}
        </select>

        {/* User Menu */}
        {user ? (
          <div className="relative group">
            <button className="flex items-center gap-2 px-2 py-1 rounded font-semibold hover:bg-[--color-bg-secondary]">
              <span>{user.name || user.email}</span>
              <span className="text-xs">{role}</span>
            </button>
            <div className="absolute right-0 mt-1 bg-[--color-bg-secondary] border rounded shadow-lg p-2 hidden group-hover:block z-10 min-w-[140px]">
              <Link
                to="/profile"
                className="block px-2 py-1 hover:underline"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="block px-2 py-1 w-full text-left hover:underline"
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 rounded bg-[--color-primary] text-white font-bold hover:opacity-90"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
