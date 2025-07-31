import React, { useState, useCallback } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import Modal from "@/components/shared/Modal"
import { BookingMediaUpload } from "./BookingMediaUpload"
import { useNotification } from "@/hooks/useNotification"

export interface Review {
  rating: number           // 1–5
  comments: string
  attachments: File[]      // photos, video, audio
}

export interface BookingReviewModalProps {
  /** Whether the modal is open */
  open: boolean
  /** Called when user closes the modal */
  onClose: () => void
  /** Called with the review when submitted */
  onSubmit: (review: Review) => Promise<void>
  /** Max attachments */
  maxAttachments?: number
  /** CSS class override */
  className?: string
}

export const BookingReviewModal: React.FC<BookingReviewModalProps> = ({
  open,
  onClose,
  onSubmit,
  maxAttachments = 3,
  className
}) => {
  const { notifyError, notifySuccess } = useNotification()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comments, setComments] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)

  const handleStarClick = useCallback((value: number) => {
    setRating(value)
  }, [])

  const handleSubmit = useCallback(async () => {
    if (rating < 1) {
      notifyError("Please select a star rating.")
      return
    }
    setSubmitting(true)
    try {
      await onSubmit({ rating, comments, attachments })
      notifySuccess("Thank you for your feedback!")
      onClose()
    } catch (err: any) {
      notifyError(err?.message || "Failed to submit review.")
    } finally {
      setSubmitting(false)
    }
  }, [rating, comments, attachments, onSubmit, notifyError, notifySuccess, onClose])

  return (
    <Modal
      show={open}
      onClose={onClose}
      title="Rate Your Service"
      size="md"
      className={className}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.span
              key={star}
              whileHover={{ scale: 1.2 }}
              onHoverStart={() => setHoverRating(star)}
              onHoverEnd={() => setHoverRating(0)}
              onClick={() => handleStarClick(star)}
              className={clsx(
                "cursor-pointer text-3xl transition-colors",
                (hoverRating || rating) >= star
                  ? "text-yellow-400"
                  : "text-gray-300"
              )}
              role="button"
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </motion.span>
          ))}
        </div>
        <textarea
          rows={4}
          placeholder="Leave your comments (optional)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          disabled={submitting}
          className="w-full px-3 py-2 border rounded-md shadow-sm bg-[--color-bg] border-[--color-border] focus:outline-none focus:border-[--color-primary]"
        />
        <BookingMediaUpload
          attachments={attachments}
          onChange={setAttachments}
          maxFiles={maxAttachments}
          accept="image/*"
          maxSizeMB={5}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 rounded font-medium transition bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={clsx(
              "px-4 py-2 rounded font-semibold transition focus:outline-none",
              submitting
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[--color-primary] text-white hover:bg-[--color-primary]/90"
            )}
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default BookingReviewModal
