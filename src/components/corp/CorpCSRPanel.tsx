import React from "react"
import clsx from "clsx"
import { FaLeaf, FaCheck } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface CorpCSRInitiative {
  id: string
  name: string
  status: "active" | "completed"
  progress: number // %
  description?: string
  startedAt: string
  completedAt?: string
}
export interface CorpCSRPanelProps {
  initiatives: CorpCSRInitiative[]
  onMarkComplete?: (id: string) => void
  className?: string
}
const CorpCSRPanel: React.FC<CorpCSRPanelProps> = ({
  initiatives, onMarkComplete, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaLeaf /> CSR/ESG Initiatives
      </h2>
      <ul className="space-y-4">
        {initiatives.length === 0
          ? <li className={clsx("text-center text-sm", text)}>No initiatives yet.</li>
          : initiatives.map(csr => (
            <li key={csr.id} className={clsx("border rounded p-3 flex justify-between items-center", text)}>
              <div>
                <div className="font-bold">{csr.name}</div>
                <div className="text-xs">{csr.description}</div>
                <div className="text-xs">{csr.status} • {csr.progress}% • {new Date(csr.startedAt).toLocaleDateString()}</div>
              </div>
              <div>
                {csr.status === "active" && (
                  <button
                    className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                    onClick={() => onMarkComplete?.(csr.id)}
                  >
                    <FaCheck /> Mark Complete
                  </button>
                )}
                {csr.status === "completed" && (
                  <span className="px-2 py-1 rounded bg-gray-500 text-white text-xs font-bold">Completed</span>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default CorpCSRPanel
