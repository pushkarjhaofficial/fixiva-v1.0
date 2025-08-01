import React from "react"
import clsx from "clsx"
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"
export interface ChecklistStep {
  label: string
  complete: boolean
}
export interface VendorOnboardingChecklistProps {
  steps: ChecklistStep[]
  className?: string
}
const VendorOnboardingChecklist: React.FC<VendorOnboardingChecklistProps> = ({
  steps, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4", text)}>Onboarding Progress</h2>
      <ul className="space-y-4">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-2">
            {s.complete
              ? <FaCheckCircle className="text-green-500" />
              : <FaRegCircle className="text-gray-400" />}
            <span className={text}>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default VendorOnboardingChecklist
