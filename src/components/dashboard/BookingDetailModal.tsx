import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FaMapMarkerAlt, FaCoins } from "react-icons/fa"
import clsx from "clsx"

import Modal from "@/components/shared/Modal"
import BookingStatusTracker, {
  BookingStatus,
} from "@/components/booking/BookingStatusTracker"
import { useNotification } from "@/hooks/useNotification"
import { useTheme } from "@/hooks/useTheme"
import { getBookingDetails } from "@/services/dashboard"
import { BookingDetails, PriceBreakdownItem } from "@/components/booking/BookingConfirmation"

export interface BookingDetailModalProps {
  bookingId: string
  show: boolean
  onClose: () => void
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  bookingId,
  show,
  onClose,
}) => {
  const { t } = useTranslation()
  const { notifyError } = useNotification()
  const { theme } = useTheme()

  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState<BookingDetails | null>(null)

  useEffect(() => {
    if (!show) return
    setLoading(true)
    getBookingDetails(bookingId)
      .then((res: BookingDetails) => {
        setDetails(res)
      })
      .catch((err: any) => {
        notifyError(err.message || t("dashboard.fetchError"))
        onClose()
      })
      .finally(() => setLoading(false))
  }, [bookingId, show, notifyError, onClose, t])

  return (
    <Modal show={show} onClose={onClose} title={t("dashboard.detailTitle")} size="lg">
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            {t("common.loading")}…
          </div>
        ) : details ? (
          <div className="space-y-6">
            {/* Status Tracker */}
            <BookingStatusTracker
              bookingId={bookingId}
              initialStatus={details.status as BookingStatus}
            />

            {/* Core Info */}
            <section aria-labelledby="detail-info" className="space-y-4">
              <h3
                id="detail-info"
                className="text-xl font-semibold text-[--color-text]"
              >
                {t("dashboard.info")}
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-[--color-text]">
                <div>
                  <dt className="font-medium">{t("booking.service")}</dt>
                  <dd>{details.serviceName}</dd>
                </div>
                <div>
                  <dt className="font-medium">{t("booking.schedule")}</dt>
                  <dd>
                    {new Date(details.dateTime).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">{t("booking.vendor")}</dt>
                  <dd>{details.vendorName}</dd>
                </div>
                <div>
                  <dt className="font-medium">{t("booking.location")}</dt>
                  <dd className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-[--color-primary]" />
                    <span>{details.location.address}</span>
                  </dd>
                </div>
              </dl>
            </section>

            {/* Pricing Breakdown */}
            <section aria-labelledby="detail-pricing" className="space-y-2">
              <h3
                id="detail-pricing"
                className="text-xl font-semibold text-[--color-text]"
              >
                {t("dashboard.pricing")}
              </h3>
              <ul className="divide-y divide-[--color-border] text-[--color-text]">
                {details.priceBreakdown.map((item: PriceBreakdownItem, i) => (
                  <li
                    key={i}
                    className="py-2 flex justify-between text-sm"
                  >
                    <span>{item.label}</span>
                    <span>
                      {new Intl.NumberFormat(undefined, {
                        style: "currency",
                        currency: t("booking.currency") || "INR",
                      }).format(item.amount)}
                    </span>
                  </li>
                ))}
                <li className="py-2 flex justify-between font-semibold">
                  <span>{t("booking.total")}</span>
                  <span>
                    {new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: t("booking.currency") || "INR",
                    }).format(
                      details.priceBreakdown.reduce(
                        (sum, itm) => sum + itm.amount,
                        0
                      )
                    )}
                  </span>
                </li>
              </ul>
            </section>

            {/* Recycle Bonus */}
            {typeof details.recycleBonus === "number" && (
              <section className="flex items-center space-x-2 text-[--color-text]">
                <FaCoins className="text-[--color-primary] text-xl" />
                <span>
                  {t("booking.recycleBonus")}: {details.recycleBonus}
                </span>
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-10 text-sm text-gray-500">
            {t("dashboard.noDetails")}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default BookingDetailModal
