import React from "react"
import clsx from "clsx"
import { FaCommentDots, FaStar } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface FranchiseFeedback {
  id: string
  customer: string
  rating: number
  feedback: string
  date: string
  branch: string
}

export interface FranchiseFeedbackTableProps {
  feedbacks: FranchiseFeedback[]
  className?: string
}

const FranchiseFeedbackTable: React.FC<FranchiseFeedbackTableProps> = ({
  feedbacks, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaCommentDots /> Customer Feedback
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Customer</th>
              <th className="px-3 py-2 text-left">Branch</th>
              <th className="px-3 py-2 text-left">Rating</th>
              <th className="px-3 py-2 text-left">Feedback</th>
              <th className="px-3 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("text-center py-6", text)}>No feedbacks.</td>
              </tr>
            ) : (
              feedbacks.map(fb => (
                <tr key={fb.id}>
                  <td className="px-3 py-2">{fb.customer}</td>
                  <td className="px-3 py-2">{fb.branch}</td>
                  <td className="px-3 py-2 flex items-center gap-1">
                    {[...Array(fb.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </td>
                  <td className="px-3 py-2">{fb.feedback}</td>
                  <td className="px-3 py-2">{new Date(fb.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default FranchiseFeedbackTable
