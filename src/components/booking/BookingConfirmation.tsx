// src/components/booking/BookingConfirmation.tsx

import React from "react"
import clsx from "clsx"
import useAuth from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"
import { useLanguage } from "@/hooks/useLanguage"
import { useNotification } from "@/hooks/useNotification"
import { useTranslation } from "react-i18next"

export interface BookingLocation {
  address: string
  lat?: number
  lng?: number
}

export interface PriceBreakdownItem {
  label: string
  amount: number
}

export interface BookingDetails {
  serviceName: string
  dateTime: string // ISO string
  vendorName: string
  location: BookingLocation
  priceBreakdown: PriceBreakdownItem[]
  recycleBonus?: number
}

export interface BookingConfirmationProps {
  bookingDetails: BookingDetails
  loyaltyTotal: number
  recycleTotal?: number
  onEdit: (
    section:
      | "serviceName"
      | "dateTime"
      | "vendorName"
      | "location"
      | "priceBreakdown"
  ) => void
  onProceed: () => void
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingDetails,
  loyaltyTotal,
  recycleTotal,
  onEdit,
  onProceed,
}) => {
  const { user } = useAuth()
  const { theme } = useTheme()
  const { lang } = useLanguage()
  const { notifySuccess, notifyError } = useNotification()
  const { t } = useTranslation()

  const copyToClipboard = async (text: string) => {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text)
        notifySuccess(t("booking.copiedToClipboard"))
      } catch {
        notifyError(t("booking.copyError") || "Failed to copy")
      }
    }
  }

  const totalPrice = bookingDetails.priceBreakdown.reduce(
    (sum, item) => sum + item.amount,
    0
  )

  const cardClass = clsx(
    "max-w-lg mx-auto rounded-lg shadow-lg p-6",
    theme === "dark"
      ? "bg-gray-900 text-white"
      : theme === "glass"
      ? "bg-white/70 backdrop-blur text-gray-900 border border-gray-200"
      : "bg-white text-gray-900"
  )

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat(lang, {
      style: "currency",
      currency: t("booking.currency") || "INR",
    }).format(amount)

  return (
    <section
      aria-labelledby="booking-confirmation-title"
      role="region"
      className={cardClass}
      tabIndex={-1}
    >
      <h2
        id="booking-confirmation-title"
        className="text-2xl font-semibold mb-6"
      >
        {t("booking.confirmationTitle")}
      </h2>

      <dl className="space-y-5">
        {/* Service */}
        <div className="flex justify-between items-center">
          <dt className="font-medium">{t("booking.service")}</dt>
          <dd className="flex items-center space-x-2">
            <span>{bookingDetails.serviceName}</span>
            <button
              onClick={() => onEdit("serviceName")}
              aria-label={t("booking.editService")}
              className="underline text-sm"
              type="button"
            >
              {t("common.edit")}
            </button>
          </dd>
        </div>

        {/* Date & Time */}
        <div className="flex justify-between items-center">
          <dt className="font-medium">{t("booking.dateAndTime")}</dt>
          <dd className="flex items-center space-x-2">
            <time dateTime={bookingDetails.dateTime}>
              {new Date(bookingDetails.dateTime).toLocaleString(
                user?.locale || lang
              )}
            </time>
            <button
              onClick={() => onEdit("dateTime")}
              aria-label={t("booking.editDateTime")}
              className="underline text-sm"
              type="button"
            >
              {t("common.edit")}
            </button>
          </dd>
        </div>

        {/* Vendor */}
        <div className="flex justify-between items-center">
          <dt className="font-medium">{t("booking.vendor")}</dt>
          <dd className="flex items-center space-x-2">
            <span>{bookingDetails.vendorName}</span>
            <button
              onClick={() => onEdit("vendorName")}
              aria-label={t("booking.editVendor")}
              className="underline text-sm"
              type="button"
            >
              {t("common.edit")}
            </button>
          </dd>
        </div>

        {/* Location */}
        <div className="flex justify-between items-start">
          <dt className="font-medium">{t("booking.location")}</dt>
          <dd className="flex flex-col space-y-1 text-right">
            <span>{bookingDetails.location.address}</span>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  copyToClipboard(bookingDetails.location.address)
                }
                aria-label={t("booking.copyAddress")}
                className="underline text-sm"
                type="button"
              >
                {t("booking.copy")}
              </button>
              <button
                onClick={() => onEdit("location")}
                aria-label={t("booking.editLocation")}
                className="underline text-sm"
                type="button"
              >
                {t("common.edit")}
              </button>
            </div>
          </dd>
        </div>

        {/* Price Breakdown */}
        <div>
          <dt className="font-medium">{t("booking.priceBreakdown")}</dt>
          <dd className="mt-2">
            <ul className="divide-y divide-gray-200">
              {bookingDetails.priceBreakdown.map((item, i) => (
                <li key={i} className="py-2 flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span>{formatCurrency(item.amount)}</span>
                </li>
              ))}

              <li className="py-2 flex justify-between font-semibold">
                <span>{t("booking.total")}</span>
                <span>{formatCurrency(totalPrice)}</span>
              </li>
            </ul>
            <button
              onClick={() => onEdit("priceBreakdown")}
              aria-label={t("booking.editPrice")}
              className="mt-2 underline text-sm"
              type="button"
            >
              {t("common.edit")}
            </button>
          </dd>
        </div>

        {/* Loyalty & Recycle */}
        <div className="flex justify-between">
          <dt className="font-medium">{t("booking.loyaltyEarned")}</dt>
          <dd>{loyaltyTotal}</dd>
        </div>
        {typeof recycleTotal !== "undefined" && (
          <div className="flex justify-between">
            <dt className="font-medium">{t("booking.recycleBonus")}</dt>
            <dd>{recycleTotal}</dd>
          </div>
        )}
      </dl>

      {/* Proceed Button */}
      <div className="mt-8 text-right">
        <button
          onClick={onProceed}
          type="button"
          className="px-5 py-2 rounded-lg font-medium focus:outline-none bg-[--color-primary] text-white hover:bg-[--color-primary]/90 transition"
        >
          {t("booking.confirmAndProceed")}
        </button>
      </div>
    </section>
  )
}

export default BookingConfirmation
