// src/components/booking/BookingRecycleBanner.tsx

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { FaRecycle, FaTimes } from "react-icons/fa"

export interface Device {
  id: string
  name: string
  imageUrl?: string
}

export interface BookingRecycleBannerProps {
  /** The device that can be recycled */
  device: Device
  /** Coins or loyalty earned by recycling */
  coinsEarned: number
  /** Called when user chooses to recycle */
  onRecycle: (device: Device) => void
  /** Called when user skips recycling */
  onSkip: () => void
  /** Whether to show the banner */
  show: boolean
  /** Optional CSS class */
  className?: string
}

export const BookingRecycleBanner: React.FC<BookingRecycleBannerProps> = ({
  device,
  coinsEarned,
  onRecycle,
  onSkip,
  show,
  className,
}) => {
  const { t } = useTranslation()

  // When banner mounts (show becomes true), we could auto-animate or fetch data
  useEffect(() => {
    // example: track impression
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={clsx(
            "fixed bottom-4 inset-x-4 md:inset-x-1/4 lg:inset-x-1/3 p-4 rounded-lg shadow-lg flex items-center bg-[--color-bg] border border-[--color-border] dark:bg-gray-800 dark:border-gray-700",
            className
          )}
          role="region"
          aria-live="polite"
          aria-label={t("booking.recycleBannerLabel", { device: device.name })}
        >
          <div className="flex-shrink-0 mr-4">
            <FaRecycle size={32} className="text-[--color-primary]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-lg truncate">
              {t("booking.recycleBannerTitle", { device: device.name })}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t("booking.recycleBannerBody", { coins: coinsEarned })}
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex space-x-2">
            <button
              onClick={() => onSkip()}
              className="px-3 py-1 rounded-md text-sm transition focus:outline-none bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              aria-label={t("booking.skipRecycle")}
            >
              {t("common.skip")}
            </button>
            <button
              onClick={() => onRecycle(device)}
              className="px-3 py-1 rounded-md text-sm font-semibold transition focus:outline-none bg-[--color-primary] text-white hover:bg-[--color-primary]/90"
              aria-label={t("booking.confirmRecycle")}
            >
              {t("booking.recycleNow")}
            </button>
            <button
              onClick={() => onSkip()}
              className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={t("common.close")}
            >
              <FaTimes />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BookingRecycleBanner
