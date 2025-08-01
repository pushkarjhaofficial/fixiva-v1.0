// src/components/booking/VendorSelector.tsx

import React from "react"
import { useTranslation } from "react-i18next"
import clsx from "clsx"

export interface Vendor {
  id: string
  name: string
  rating: number
  price: number
  distanceKm?: number
  avatarUrl?: string
}

export interface VendorSelectorProps {
  vendors: Vendor[]
  selectedVendorId: string | null
  onSelect: (vendorId: string) => void
}

const VendorSelector: React.FC<VendorSelectorProps> = ({
  vendors,
  selectedVendorId,
  onSelect
}) => {
  const { t } = useTranslation()

  return (
    <div className="grid gap-3">
      {vendors.map((vendor) => (
        <div
          key={vendor.id}
          onClick={() => onSelect(vendor.id)}
          className={clsx(
            "flex items-center gap-3 p-3 rounded border cursor-pointer transition",
            selectedVendorId === vendor.id
              ? "border-primary-600 bg-primary-50 dark:bg-primary-900"
              : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          )}
        >
          <img
            src={vendor.avatarUrl || "/default-avatar.png"}
            alt={vendor.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium">{vendor.name}</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              ⭐ {vendor.rating} • ₹{vendor.price}
              {vendor.distanceKm && ` • ${vendor.distanceKm} km`}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VendorSelector
