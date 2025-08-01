import React from "react"
import clsx from "clsx"
import { FaRecycle, FaTrash, FaGavel, FaCheck, FaHistory } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface GovtAssetDisposal {
  id: string
  assetName: string
  assetTag: string
  department: string
  status: "pending" | "approved" | "recycled" | "retired" | "auctioned" | "donated"
  requestedBy: string
  requestedDate: string
  approvedBy?: string
  approvedDate?: string
  method: "recycle" | "retire" | "auction" | "donate"
}

export interface GovtAssetDisposalTableProps {
  assets: GovtAssetDisposal[]
  onApprove?: (id: string) => void
  onViewHistory?: (id: string) => void
  className?: string
}

const methodIcon = {
  recycle: <FaRecycle className="text-green-500" />,
  retire: <FaTrash className="text-gray-400" />,
  auction: <FaGavel className="text-yellow-600" />,
  donate: <FaCheck className="text-blue-600" />
}

const GovtAssetDisposalTable: React.FC<GovtAssetDisposalTableProps> = ({
  assets, onApprove, onViewHistory, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        PSU Asset Disposal
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Asset</th>
              <th className="px-3 py-2 text-left">Tag</th>
              <th className="px-3 py-2 text-left">Dept</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Method</th>
              <th className="px-3 py-2 text-left">Requested</th>
              <th className="px-3 py-2 text-left">Approved</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">No disposals.</td>
              </tr>
            ) : (
              assets.map(asset => (
                <tr key={asset.id}>
                  <td className="px-3 py-2">{asset.assetName}</td>
                  <td className="px-3 py-2">{asset.assetTag}</td>
                  <td className="px-3 py-2">{asset.department}</td>
                  <td className="px-3 py-2">{asset.status}</td>
                  <td className="px-3 py-2">{methodIcon[asset.method]}</td>
                  <td className="px-3 py-2">
                    {asset.requestedBy} <br />
                    <span className="text-xs text-gray-400">{new Date(asset.requestedDate).toLocaleDateString()}</span>
                  </td>
                  <td className="px-3 py-2">
                    {asset.approvedBy
                      ? <>
                        {asset.approvedBy}
                        <br />
                        <span className="text-xs text-gray-400">{asset.approvedDate && new Date(asset.approvedDate).toLocaleDateString()}</span>
                      </>
                      : "-"}
                  </td>
                  <td className="px-3 py-2 flex gap-2">
                    {asset.status === "pending" && onApprove && (
                      <button
                        className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                        onClick={() => onApprove(asset.id)}
                      >Approve</button>
                    )}
                    <button
                      className="px-2 py-1 rounded bg-gray-300 text-gray-700 text-xs flex items-center gap-1"
                      onClick={() => onViewHistory?.(asset.id)}
                    ><FaHistory /> History</button>
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
export default GovtAssetDisposalTable
