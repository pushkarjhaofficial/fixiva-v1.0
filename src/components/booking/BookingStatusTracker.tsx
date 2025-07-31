// src/components/booking/BookingStatusTracker.tsx

import React, { useEffect, useState } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import { useSocket } from "@/hooks/useSocket"
import { useTranslation } from "react-i18next"
import {
  FaCheckCircle,
  FaClock,
  FaPlayCircle,
  FaStar,
  FaTimesCircle,
} from "react-icons/fa"

export type BookingStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled"

export interface BookingStatusTrackerProps {
  /** The booking identifier to listen on */
  bookingId: string
  /** Initial status, if any */
  initialStatus?: BookingStatus
  /** Callback when user clicks an action (e.g. “Cancel”) */
  onAction?: (action: string) => void
  /** Extra CSS classes */
  className?: string
}

/** Defines the sequence and labels/icons for each status */
const STATUS_STEPS: {
  status: BookingStatus
  labelKey: string
  icon: React.ReactNode
}[] = [
  { status: "pending", labelKey: "booking.status.pending", icon: <FaClock /> },
  {
    status: "accepted",
    labelKey: "booking.status.accepted",
    icon: <FaCheckCircle />,
  },
  {
    status: "in_progress",
    labelKey: "booking.status.inProgress",
    icon: <FaPlayCircle />,
  },
  { status: "completed", labelKey: "booking.status.completed", icon: <FaStar /> },
  {
    status: "cancelled",
    labelKey: "booking.status.cancelled",
    icon: <FaTimesCircle />,
  },
]

/**
 * BookingStatusTracker
 * Displays a vertical stepper of booking status updates in real time.
 */
export const BookingStatusTracker: React.FC<BookingStatusTrackerProps> = ({
  bookingId,
  initialStatus = "pending",
  onAction,
  className,
}) => {
  const { t } = useTranslation()
  // Destructure the actual socket instance
  const { socket } = useSocket()
  const [currentStatus, setCurrentStatus] =
    useState<BookingStatus>(initialStatus)

  useEffect(() => {
    if (!socket) return
    socket.emit("joinBookingRoom", bookingId)
    socket.on(
      "bookingStatusUpdate",
      (data: { bookingId: string; status: BookingStatus }) => {
        if (data.bookingId === bookingId) {
          setCurrentStatus(data.status)
        }
      }
    )
    return () => {
      socket.emit("leaveBookingRoom", bookingId)
      socket.off("bookingStatusUpdate")
    }
  }, [socket, bookingId])

  const currentIndex = STATUS_STEPS.findIndex(
    (s) => s.status === currentStatus
  )

  return (
    <div
      className={clsx("space-y-6", className)}
      role="region"
      aria-label={t("booking.statusTracker")}
    >
      {STATUS_STEPS.map((step, idx) => {
        const isDone = idx < currentIndex
        const isActive = idx === currentIndex
        return (
          <motion.div
            key={step.status}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div className="flex-shrink-0">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  isDone
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-[--color-primary] text-white"
                    : "bg-gray-200 text-gray-500"
                )}
                aria-hidden="true"
              >
                {step.icon}
              </div>
            </div>
            <div className="flex-1">
              <div
                className={clsx(
                  "font-medium",
                  isActive
                    ? "text-[--color-primary]"
                    : isDone
                    ? "text-gray-700"
                    : "text-gray-500"
                )}
              >
                {t(step.labelKey)}
              </div>
              {isActive && (
                <div className="mt-1 text-sm text-gray-600">
                  {t(`booking.status.${step.status}Desc`, { defaultValue: "" })}
                </div>
              )}
            </div>
          </motion.div>
        )
      })}

      {currentStatus === "pending" && onAction && (
        <div className="text-right">
          <button
            onClick={() => onAction("cancel")}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            {t("booking.cancelBooking")}
          </button>
        </div>
      )}
    </div>
  )
}

export default BookingStatusTracker
