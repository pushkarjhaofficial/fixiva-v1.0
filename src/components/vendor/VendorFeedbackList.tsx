// src/components/vendor/VendorFeedbackList.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaStar, FaUserCircle, FaComment } from "react-icons/fa"

export interface FeedbackItem {
  id: string
  customerName: string
  comment: string
  rating: number
  date: string   // ISO
}

export interface VendorFeedbackListProps {
  feedback: FeedbackItem[]
  className?: string
}

const VendorFeedbackList: React.FC<VendorFeedbackListProps> = ({ feedback, className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, border, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4", text)}>
        <FaComment className="inline-block mr-2" />
        {t("vendor.feedbackTitle") || "Customer Feedback"}
      </h2>
      <ul className="space-y-5">
        {feedback.length === 0 ? (
          <li className={clsx("text-center text-sm", subText)}>{t("vendor.noFeedback") || "No feedback found."}</li>
        ) : (
          feedback.map(fb => (
            <li key={fb.id} className={clsx("flex gap-3 items-start p-3 rounded", "bg-[--color-bg-secondary]")}>
              <FaUserCircle className="text-3xl text-[--color-primary]" />
              <div className="flex-1">
                <div className={clsx("font-bold", text)}>{fb.customerName}</div>
                <div className={clsx("text-sm mb-1", subText)}>
                  {new Date(fb.date).toLocaleDateString()}
                </div>
                <div className={clsx("flex items-center gap-1 mb-1", subText)}>
                  {Array.from({ length: 5 }).map((_, i) =>
                    <FaStar key={i} className={i < fb.rating ? "text-yellow-400" : "text-gray-300"} />
                  )}
                  <span className={clsx("ml-2 font-medium", text)}>{fb.rating.toFixed(1)}</span>
                </div>
                <div className={clsx("italic", text)}>"{fb.comment}"</div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default VendorFeedbackList
