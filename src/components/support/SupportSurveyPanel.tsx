import React from "react"
import clsx from "clsx"
import { FaRegSmile, FaStar } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SupportSurveyPanelProps {
  onSubmit: (score: number, comment?: string) => void
  loading?: boolean
  className?: string
}

const SupportSurveyPanel: React.FC<SupportSurveyPanelProps> = ({
  onSubmit, loading, className
}) => {
  const { theme } = useTheme()
  const [score, setScore] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <form className={clsx("rounded-lg shadow border p-6", cardBg, className)}
      onSubmit={e => { e.preventDefault(); if (score) onSubmit(score, comment) }}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaRegSmile /> Support Survey
      </h2>
      <div className="flex items-center gap-2 mb-3">
        {[1,2,3,4,5].map(n => (
          <button key={n} type="button" className={clsx("text-2xl", score >= n ? "text-yellow-500" : "text-gray-400")}
            onClick={() => setScore(n)}>
            <FaStar />
          </button>
        ))}
      </div>
      <textarea
        className="w-full border rounded px-2 py-1 mb-2"
        rows={2}
        placeholder="Add a comment (optional)..."
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="px-5 py-2 rounded bg-[--color-primary] text-white"
        disabled={loading || !score}
      >
        Submit
      </button>
    </form>
  )
}
export default SupportSurveyPanel
