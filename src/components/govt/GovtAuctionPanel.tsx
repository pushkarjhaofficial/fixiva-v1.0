import React from "react"
import clsx from "clsx"
import { FaGavel, FaUser, FaHistory } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface AuctionBid {
  bidder: string
  amount: number
  time: string
}

export interface AuctionItem {
  id: string
  asset: string
  status: "open" | "closed" | "awarded"
  minBid: number
  currentBid: number
  bids: AuctionBid[]
}

export interface GovtAuctionPanelProps {
  items: AuctionItem[]
  onBid: (itemId: string, bid: number) => void
  onViewHistory?: (itemId: string) => void
  className?: string
}

const GovtAuctionPanel: React.FC<GovtAuctionPanelProps> = ({
  items, onBid, onViewHistory, className
}) => {
  const { theme } = useTheme()
  const [bidAmounts, setBidAmounts] = React.useState<Record<string, string>>({})
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaGavel /> Asset Auction
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Asset</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Min Bid</th>
              <th className="px-3 py-2 text-left">Current Bid</th>
              <th className="px-3 py-2 text-left">Your Bid</th>
              <th className="px-3 py-2 text-left">Bids</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">No auctions.</td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id}>
                  <td className="px-3 py-2">{item.asset}</td>
                  <td className="px-3 py-2">{item.status}</td>
                  <td className="px-3 py-2">{item.minBid.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</td>
                  <td className="px-3 py-2">{item.currentBid.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      className="w-24 border px-2 py-1 rounded"
                      min={item.minBid}
                      value={bidAmounts[item.id] || ""}
                      onChange={e => setBidAmounts(b => ({ ...b, [item.id]: e.target.value }))}
                      disabled={item.status !== "open"}
                    />
                  </td>
                  <td className="px-3 py-2">
                    {item.bids.length}
                    <button
                      className="ml-2 text-xs text-blue-700 underline"
                      onClick={() => onViewHistory?.(item.id)}
                    ><FaHistory /> History</button>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      className="px-3 py-1 rounded bg-green-600 text-white text-xs"
                      onClick={() => {
                        const val = parseInt(bidAmounts[item.id] || "0", 10)
                        if (val && val >= item.minBid) onBid(item.id, val)
                      }}
                      disabled={item.status !== "open"}
                    >Bid</button>
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
export default GovtAuctionPanel
