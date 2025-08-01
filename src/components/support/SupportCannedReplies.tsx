import React from "react"
import clsx from "clsx"
import { FaRegCopy, FaCommentDots } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SupportCannedReply {
  id: string
  label: string
  text: string
}

export interface SupportCannedRepliesProps {
  replies: SupportCannedReply[]
  onCopy: (text: string) => void
  className?: string
}

const SupportCannedReplies: React.FC<SupportCannedRepliesProps> = ({
  replies, onCopy, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaCommentDots /> Canned Replies
      </h2>
      <div className="space-y-2">
        {replies.map(r => (
          <div key={r.id} className="flex items-center gap-2">
            <span className="font-semibold">{r.label}:</span>
            <span className="text-sm flex-1">{r.text}</span>
            <button
              className="p-1 bg-[--color-primary] rounded text-white"
              onClick={() => onCopy(r.text)}
              title="Copy"
            >
              <FaRegCopy />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SupportCannedReplies
