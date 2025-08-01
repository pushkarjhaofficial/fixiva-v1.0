import React from "react"
import clsx from "clsx"
import { FaPlusSquare, FaBarcode } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface GovtAssetIntake {
  id: string
  assetName: string
  assetTag: string
  department: string
  vendor: string
  purchaseDate: string
  warrantyEnd: string
  value: number
  status: "active" | "pending" | "disposed"
}

export interface GovtAssetIntakeTableProps {
  assets: GovtAssetIntake[]
  onScan?: (id: string) => void
  onView?: (id: string) => void
  className?: string
}

const GovtAssetIntakeTable: React.FC<GovtAssetIntakeTableProps> = ({
  assets, onScan, onView, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaPlusSquare /> Asset Intake Register
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Asset</th>
              <th className="px-3 py-2 text-left">Tag</th>
              <th className="px-3 py-2 text-left">Dept</th>
              <th className="px-3 py-2 text-left">Vendor</th>
              <th className="px-3 py-2 text-left">Purchase</th>
              <th className="px-3 py-2 text-left">Warranty</th>
              <th className="px-3 py-2 text-left">Value</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">No new assets.</td>
              </tr>
            ) : (
              assets.map(asset => (
                <tr key={asset.id}>
                  <td className="px-3 py-2">{asset.assetName}</td>
                  <td className="px-3 py-2">{asset.assetTag}</td>
                  <td className="px-3 py-2">{asset.department}</td>
                  <td className="px-3 py-2">{asset.vendor}</td>
                  <td className="px-3 py-2">{new Date(asset.purchaseDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{new Date(asset.warrantyEnd).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{asset.value.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</td>
                  <td className="px-3 py-2">{asset.status}</td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      className="px-2 py-1 rounded bg-blue-600 text-white text-xs"
                      onClick={() => onScan?.(asset.id)}
                    ><FaBarcode /> Scan</button>
                    <button
                      className="px-2 py-1 rounded bg-gray-400 text-gray-800 text-xs"
                      onClick={() => onView?.(asset.id)}
                    >View</button>
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
export default GovtAssetIntakeTable
