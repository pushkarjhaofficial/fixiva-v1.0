import React from "react"
import clsx from "clsx"
import { FaRecycle, FaDownload, FaSearch } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface RecycleAdminPanelProps {
  totalRequests: number
  totalAssets: number
  totalWeightKg: number
  totalRewardCoins: number
  exportCSV: () => void
  onSearch: (q: string) => void
  className?: string
}
const RecycleAdminPanel: React.FC<RecycleAdminPanelProps> = ({
  totalRequests, totalAssets, totalWeightKg, totalRewardCoins, exportCSV, onSearch, className
}) => {
  const { theme } = useTheme()
  const [q, setQ] = React.useState("")
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <section className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-xl font-semibold mb-4 flex items-center gap-2", text)}>
        <FaRecycle /> Recycling Admin
      </h2>
      <div className="flex gap-4 flex-wrap mb-4">
        <div className={clsx("flex flex-col items-center p-2 rounded bg-[--color-bg-secondary]", text)}>
          <span className="font-bold text-lg">{totalRequests}</span>
          <span className="text-xs">Requests</span>
        </div>
        <div className={clsx("flex flex-col items-center p-2 rounded bg-[--color-bg-secondary]", text)}>
          <span className="font-bold text-lg">{totalAssets}</span>
          <span className="text-xs">Assets</span>
        </div>
        <div className={clsx("flex flex-col items-center p-2 rounded bg-[--color-bg-secondary]", text)}>
          <span className="font-bold text-lg">{totalWeightKg} kg</span>
          <span className="text-xs">Total Weight</span>
        </div>
        <div className={clsx("flex flex-col items-center p-2 rounded bg-[--color-bg-secondary]", text)}>
          <span className="font-bold text-lg">{totalRewardCoins}</span>
          <span className="text-xs">Coins Given</span>
        </div>
        <button
          type="button"
          className="ml-auto px-4 py-2 bg-[--color-primary] text-white rounded flex items-center gap-2 font-bold"
          onClick={exportCSV}
        >
          <FaDownload /> Export CSV
        </button>
      </div>
      <form onSubmit={e => { e.preventDefault(); onSearch(q); }} className="flex items-center gap-2">
        <input
          type="search"
          className="border rounded px-3 py-1"
          placeholder="Search assets/users/ID"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button type="submit" className="bg-gray-700 text-white px-3 py-1 rounded">
          <FaSearch />
        </button>
      </form>
    </section>
  )
}
export default RecycleAdminPanel
