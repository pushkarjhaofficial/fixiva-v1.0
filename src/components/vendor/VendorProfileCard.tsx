// src/components/vendor/VendorProfileCard.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaStar, FaCheckCircle, FaPhoneAlt, FaEnvelope } from "react-icons/fa"

export interface VendorProfile {
  name: string
  businessName?: string
  phone: string
  email: string
  avatarUrl?: string
  address?: string
  rating?: number
  verified?: boolean
  specialties?: string[]
}

export interface VendorProfileCardProps {
  vendor: VendorProfile
  className?: string
}

/**
 * VendorProfileCard
 * Beautiful, production-ready profile card for vendors/partners.
 */
const VendorProfileCard: React.FC<VendorProfileCardProps> = ({ vendor, className }) => {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <div className={clsx("w-full max-w-md mx-auto rounded-lg shadow border p-6 flex flex-col items-center", cardBg, border, className)}>
      {/* Avatar */}
      <img
        src={vendor.avatarUrl || "/vendor-avatar.svg"}
        alt={vendor.name}
        className="w-20 h-20 rounded-full object-cover border-4 border-[--color-primary] mb-3"
      />
      {/* Name and Verification */}
      <div className="flex items-center space-x-2 mb-2">
        <span className={clsx("font-bold text-lg", text)}>
          {vendor.name}
        </span>
        {vendor.verified && <FaCheckCircle className="text-green-500" title={t("vendor.verified")} />}
      </div>
      {/* Business Name */}
      {vendor.businessName && (
        <div className={clsx("font-medium mb-2", subText)}>
          {vendor.businessName}
        </div>
      )}
      {/* Contact Info */}
      <div className={clsx("flex flex-col items-center gap-1 mb-3", subText)}>
        <div className="flex items-center gap-2">
          <FaPhoneAlt />
          <span>{vendor.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope />
          <span>{vendor.email}</span>
        </div>
      </div>
      {/* Address */}
      {vendor.address && (
        <div className={clsx("mb-3 text-sm text-center", subText)}>
          {vendor.address}
        </div>
      )}
      {/* Specialties */}
      {vendor.specialties && vendor.specialties.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2 justify-center">
          {vendor.specialties.map((spec, i) => (
            <span key={i} className="px-2 py-1 rounded-full bg-[--color-primary]/10 text-[--color-primary] text-xs font-semibold">
              {spec}
            </span>
          ))}
        </div>
      )}
      {/* Rating */}
      <div className="flex items-center gap-1 mt-1">
        <FaStar className="text-yellow-400" />
        <span className="font-medium">{(vendor.rating ?? 0).toFixed(1)}</span>
        <span className={clsx("text-xs", subText)}>{t("vendor.rating")}</span>
      </div>
    </div>
  )
}

export default VendorProfileCard
