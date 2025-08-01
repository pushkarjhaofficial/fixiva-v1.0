// src/components/support/FeedbackResolutionModal.tsx

import React, { useState } from "react"
import Modal from "@/components/shared/Modal"

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (feedback: string, rating: number) => void
}

const FeedbackResolutionModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit
}) => {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  const handleSubmit = () => {
    if (rating === 0) return
    onSubmit(feedback.trim(), rating)
    setRating(0)
    setFeedback("")
    onClose()
  }

  return (
    <Modal show={open} onClose={onClose} title="Resolution Feedback" ariaLabel="Resolution Feedback Modal">
      <div className="space-y-4">
        <div className="flex gap-2 text-2xl justify-center">
          {[1, 2, 3, 4, 5].map(i => (
            <button
              key={i}
              aria-label={`Rate ${i} star`}
              onClick={() => setRating(i)}
              className={i <= rating ? "text-yellow-400" : "text-neutral-400"}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="What worked? What didn’t? Your input helps us improve."
          className="w-full border rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-900 dark:border-neutral-700"
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-1.5 rounded border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="text-sm px-4 py-1.5 rounded bg-primary-600 text-white disabled:opacity-40"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default FeedbackResolutionModal
