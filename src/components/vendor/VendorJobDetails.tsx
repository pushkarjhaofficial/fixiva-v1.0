// src/components/vendor/VendorJobDetails.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaClock, FaUser, FaMapMarkerAlt, FaMoneyBillAlt, FaRegComment } from "react-icons/fa"

export interface VendorJobDetailsProps {
  job: {
    id: string
    serviceName: string
    status: string
    scheduledAt: string   // ISO string
    customerName: string
    location: string
    price: number
    notes?: string
    contact?: string
    history?: { status: string; changedAt: string }[]
  }
  className?: string
}

/**
 * VendorJobDetails
 * Elite, accessible, full info card for a vendor's single job/service request.
 */
const VendorJobDetails: React.FC<VendorJobDetailsProps> = ({ job, className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-gray-100" : "text-gray-900"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"

  return (
    <section
      aria-labelledby="vendor-job-details-title"
      className={clsx("rounded-lg shadow border p-6 max-w-xl mx-auto", bg, border, className)}
    >
      <h2 id="vendor-job-details-title" className={clsx("font-bold text-xl mb-4", text)}>
        {t("vendor.jobDetailsTitle") || "Job Details"}
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FaClock className="text-[--color-primary]" />
          <span>{new Date(job.scheduledAt).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUser className="text-[--color-primary]" />
          <span>{job.customerName}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-[--color-primary]" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMoneyBillAlt className="text-[--color-primary]" />
          <span>
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "INR"
            }).format(job.price)}
          </span>
        </div>
        {job.notes && (
          <div className="flex items-center gap-2">
            <FaRegComment className="text-[--color-primary]" />
            <span className="italic">{job.notes}</span>
          </div>
        )}
        {job.contact && (
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium">{t("vendor.contact") || "Contact"}:</span>
            <span>{job.contact}</span>
          </div>
        )}
      </div>
      {/* Status history */}
      {job.history && job.history.length > 0 && (
        <div className="mt-5">
          <div className={clsx("font-medium mb-2", text)}>{t("vendor.statusHistory") || "Status History"}</div>
          <ul className="text-xs space-y-1">
            {job.history.map((h, idx) => (
              <li key={idx}>
                <span className="font-bold">{t(`booking.status.${h.status}`) || h.status}</span>
                {" "}
                <span className="opacity-80">
                  {new Date(h.changedAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default VendorJobDetails
