// src/components/vendor/VendorServiceCoverageMap.tsx

import React from "react"
import clsx from "clsx"
import { FaMapMarkedAlt } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface VendorServiceCoverageMapProps {
  mapUrl?: string // Embed link or Google Map share iframe
  vendorName?: string
  coverageDescription?: string
  className?: string
  fallbackIcon?: React.ReactNode
}

const VendorServiceCoverageMap: React.FC<VendorServiceCoverageMapProps> = ({
  mapUrl,
  vendorName = "This vendor",
  coverageDescription = "shows active service coverage for your selected area.",
  className = "",
  fallbackIcon = <FaMapMarkedAlt className="text-3xl text-neutral-400" />
}) => {
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-neutral-900" : "bg-white"
  const textColor = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-neutral-400" : "text-neutral-500"
  const borderColor = theme === "dark" ? "border-neutral-700" : "border-neutral-200"

  return (
    <div
      className={clsx(
        "rounded-xl border overflow-hidden shadow-md transition-colors duration-300",
        cardBg,
        borderColor,
        className
      )}
      aria-label="Vendor service coverage map"
    >
      <div className={clsx("flex items-center gap-3 px-5 py-4 border-b", borderColor)}>
        <FaMapMarkedAlt className={clsx("text-xl", textColor)} />
        <div>
          <h2 className={clsx("text-base font-semibold", textColor)}>
            {vendorName} Coverage Area
          </h2>
          <p className={clsx("text-xs", subText)}>{coverageDescription}</p>
        </div>
      </div>

      {mapUrl ? (
        <iframe
          title={`${vendorName} Service Area Map`}
          src={mapUrl}
          width="100%"
          height="320"
          className="w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="p-8 flex flex-col items-center justify-center text-center">
          {fallbackIcon}
          <p className={clsx("mt-3 text-sm", subText)}>
            Map not available. Please contact vendor for service area info.
          </p>
        </div>
      )}
    </div>
  )
}

export default VendorServiceCoverageMap
