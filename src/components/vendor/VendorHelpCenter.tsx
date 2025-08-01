import React from "react"
import clsx from "clsx"
import { FaQuestionCircle } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"
export interface HelpFAQ {
  question: string
  answer: string
}
export interface VendorHelpCenterProps {
  faqs: HelpFAQ[]
  className?: string
}
const VendorHelpCenter: React.FC<VendorHelpCenterProps> = ({ faqs, className }) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaQuestionCircle /> Help Center
      </h2>
      <ul className="space-y-4">
        {faqs.map((f, i) => (
          <li key={i}>
            <div className={clsx("font-bold", text)}>{f.question}</div>
            <div className={clsx("text-sm", text)}>{f.answer}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default VendorHelpCenter
