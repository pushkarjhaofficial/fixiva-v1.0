// src/components/vendor/VendorAssetTracker.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaTools, FaBarcode, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

export interface VendorAsset {
  id: string
  name: string
  serial: string
  assignedTo?: string
  status: string
  location: string
  lastService?: string // ISO
}

export interface VendorAssetTrackerProps {
  assets: VendorAsset[]
  className?: string
}

const VendorAssetTracker: React.FC<VendorAssetTrackerProps> = ({ assets, className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <div className={clsx("rounded-lg shadow border p-6", bg, border, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4", text)}>
        <FaTools className="inline-block mr-2" />
        {t("vendor.assetsTitle") || "Assets Tracker"}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className={clsx("bg-[--color-bg-secondary]")}>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.assetName") || "Asset"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.serial") || "Serial No."}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.status") || "Status"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.location") || "Location"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.lastService") || "Last Serviced"}</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("py-6 text-center", subText)}>
                  {t("vendor.noAssets") || "No assets found."}
                </td>
              </tr>
            ) : (
              assets.map(asset => (
                <tr key={asset.id} className="hover:bg-[--color-bg-hover] transition">
                  <td className="px-3 py-2 font-medium flex items-center gap-2">
                    <FaBarcode className="text-[--color-primary]" />{asset.name}
                  </td>
                  <td className="px-3 py-2">{asset.serial}</td>
                  <td className="px-3 py-2">{t(`vendor.assetStatus.${asset.status}`) || asset.status}</td>
                  <td className="px-3 py-2 flex items-center gap-1">
                    <FaMapMarkerAlt className="inline" /> {asset.location}
                  </td>
                  <td className="px-3 py-2">
                    {asset.lastService
                      ? (
                        <>
                          <FaCalendarAlt className="inline mr-1" />
                          {new Date(asset.lastService).toLocaleDateString()}
                        </>
                      ) : "--"}
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

export default VendorAssetTracker
