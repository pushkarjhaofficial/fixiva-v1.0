import React from "react"
import clsx from "clsx"
import { FaCoins } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface RecycleReward {
  id: string
  type: string
  value: number
  earnedAt: string
  used?: boolean
}

export interface RecycleRewardsPanelProps {
  rewards: RecycleReward[]
  className?: string
}

const RecycleRewardsPanel: React.FC<RecycleRewardsPanelProps> = ({
  rewards, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaCoins /> Recycling Rewards
      </h2>
      <ul className="space-y-4">
        {rewards.length === 0
          ? <li className={clsx("text-center text-sm", subText)}>No rewards yet.</li>
          : rewards.map(r => (
            <li key={r.id} className={clsx("border rounded p-3 flex justify-between items-center", text)}>
              <div>
                <div className="font-bold">{r.type}</div>
                <div className="text-xs">{new Date(r.earnedAt).toLocaleString()}</div>
              </div>
              <div className={clsx(r.used ? "line-through text-gray-500" : "font-bold text-yellow-500")}>
                +{r.value} coins
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default RecycleRewardsPanel
