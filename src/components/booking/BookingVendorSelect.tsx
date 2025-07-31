// src/components/booking/BookingVendorSelect.tsx

import React, { useMemo, useState } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"

export type BookingVendorRole =
  | "customer"
  | "vendor"
  | "admin"
  | "govt_officer"
  | "govt_contractor"
  | "govt_employee"
  | "corp_admin"
  | "client_partner"
  | "support_agent"
  | "auditor"
  | "franchise_owner"

export interface Vendor {
  id: string
  name: string
  avatarUrl?: string
  rating?: number      // 0–5
  distanceKm?: number  // e.g. 2.4
  status: "available" | "busy" | "offline"
}

export interface BookingVendorSelectProps {
  vendors: Vendor[]
  selectedVendorId?: string
  onSelect: (vendor: Vendor) => void
  loading?: boolean
  role?: BookingVendorRole
  className?: string
}

const statusColors: Record<Vendor["status"], string> = {
  available: "bg-green-500",
  busy: "bg-yellow-500",
  offline: "bg-gray-400"
}

export const BookingVendorSelect: React.FC<BookingVendorSelectProps> = ({
  vendors,
  selectedVendorId,
  onSelect,
  loading = false,
  role = "customer",
  className
}) => {
  const [search, setSearch] = useState("")

  const filtered = useMemo(
    () =>
      vendors.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase())
      ),
    [vendors, search]
  )

  return (
    <div className={clsx("w-full", className)}>
      <label
        htmlFor="vendor-search"
        className="block mb-1 font-medium text-[--color-text]"
      >
        Search Vendor
      </label>
      <input
        id="vendor-search"
        type="text"
        placeholder="Type to filter…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-[--color-primary] bg-[--color-bg]"
        aria-label="Filter vendors by name"
      />

      <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
        {loading ? (
          <div className="text-center py-4 text-[--color-primary]">
            Loading vendors…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            No vendors found
          </div>
        ) : (
          filtered.map((vendor) => {
            const isSelected = vendor.id === selectedVendorId
            return (
              <motion.div
                key={vendor.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Select vendor ${vendor.name}`}
                onClick={() => vendor.status === "available" && onSelect(vendor)}
                whileHover={
                  vendor.status === "available"
                    ? { scale: 1.02 }
                    : undefined
                }
                whileTap={
                  vendor.status === "available"
                    ? { scale: 0.98 }
                    : undefined
                }
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer select-none",
                  isSelected
                    ? "bg-[--color-primary] text-white shadow-lg"
                    : "bg-[--color-bg-secondary] hover:bg-[--color-primary]/10",
                  vendor.status !== "available" && "opacity-60 cursor-not-allowed"
                )}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={vendor.avatarUrl || "/avatar-placeholder.png"}
                    alt={vendor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span
                    className={clsx(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                      statusColors[vendor.status]
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{vendor.name}</div>
                  <div className="text-xs text-gray-500">
                    {vendor.rating != null && <>⭐ {vendor.rating.toFixed(1)} </>}
                    {vendor.distanceKm != null && (
                      <span className="ml-2">{vendor.distanceKm.toFixed(1)} km</span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default BookingVendorSelect
