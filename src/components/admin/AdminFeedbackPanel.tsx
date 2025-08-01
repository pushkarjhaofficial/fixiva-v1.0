// src/components/admin/AdminFeedbackPanel.tsx

import React from "react"
import clsx from "clsx"
import { FaCommentDots } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"

export interface Feedback {
  id: string
  user: string
  comment: string
  rating: number // 1 to 5
  createdAt: string
}

export interface AdminFeedbackPanelProps {
  feedbacks: Feedback[]
  className?: string
}

const AdminFeedbackPanel: React.FC<AdminFeedbackPanelProps> = ({
  feedbacks,
  className
}) => {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"

  const renderStars = (count: number) =>
    [...Array(5)].map((_, i) => (
      <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ))

  return (
    <section
      className={clsx("rounded-lg shadow border p-6", cardBg, border, className)}
      aria-labelledby="admin-feedback-title"
    >
      <h2
        id="admin-feedback-title"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaCommentDots aria-hidden />
        {t("admin.userFeedback") || "User Feedback"}
      </h2>

      <ul className="space-y-4">
        {feedbacks.length === 0 ? (
          <li className={clsx("text-center text-sm", subText)}>
            {t("admin.noFeedback") || "No feedback yet."}
          </li>
        ) : (
          feedbacks.map((f) => (
            <li
              key={f.id}
              className={clsx("border rounded-md p-3 bg-[--color-bg-secondary]")}
              aria-label={`Feedback from ${f.user}`}
            >
              <div className={clsx("font-bold mb-1", text)}>{f.user}</div>
              <p className={clsx("text-sm mb-2", text)}>{f.comment}</p>
              <div className={clsx("flex items-center justify-between text-xs", subText)}>
                <div className="flex gap-1">{renderStars(f.rating)}</div>
                <time dateTime={f.createdAt}>
                  {new Date(f.createdAt).toLocaleString()}
                </time>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default AdminFeedbackPanel
