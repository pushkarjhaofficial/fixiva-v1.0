// src/components/vendor/VendorJobsList.tsx

import React, { useState, useMemo } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"
import { Link } from "react-router-dom"
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"

export type JobStatus = "pending" | "in_progress" | "completed" | "cancelled"

export interface JobSummary {
  id: string
  serviceName: string
  dateTime: string   // ISO string
  customerName: string
  status: JobStatus
}

export interface VendorJobsListProps {
  /** Array of job summaries to display */
  jobs: JobSummary[]
  /** Jobs per page */
  pageSize?: number
  /** Optional extra classes */
  className?: string
}

/**
 * VendorJobsList
 * Paginated, searchable table of vendor jobs with service, schedule, customer, status & details link.
 * World-class, responsive, theme-aware, i18n-ready, accessible.
 */
const VendorJobsList: React.FC<VendorJobsListProps> = ({
  jobs,
  pageSize = 10,
  className,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  // Filtered jobs by search term (serviceName or customerName)
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return jobs
    return jobs.filter(
      (j) =>
        j.serviceName.toLowerCase().includes(term) ||
        j.customerName.toLowerCase().includes(term)
    )
  }, [search, jobs])

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  const inputBg = theme === "dark" ? "bg-gray-800" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-gray-200" : "text-gray-900"
  const headerBg = theme === "dark" ? "bg-gray-700" : "bg-gray-50"

  return (
    <div className={clsx("space-y-4", className)}>
      {/* Search */}
      <div className="flex items-center space-x-2">
        <FaSearch className={clsx("text-lg", text)} />
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder={t("vendor.searchPlaceholder")}
          className={clsx(
            "flex-1 px-3 py-2 rounded border focus:outline-none",
            inputBg,
            border,
            text
          )}
          aria-label={t("vendor.searchAria")}
        />
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow border">
        <table className="min-w-full divide-y divide-[--color-border]">
          <thead className={clsx(headerBg)}>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
                {t("vendor.jobId")}
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
                {t("vendor.service")}
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
                {t("vendor.schedule")}
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
                {t("vendor.customer")}
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
                {t("vendor.status")}
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-[--color-text-secondary]">
                {t("common.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--color-border]">
            {paged.map((job) => (
              <tr key={job.id} className="hover:bg-[--color-bg-secondary]">
                <td className={clsx("px-4 py-3 text-sm", text)}>{job.id}</td>
                <td className={clsx("px-4 py-3 text-sm", text)}>{job.serviceName}</td>
                <td className={clsx("px-4 py-3 text-sm", text)}>
                  {new Date(job.dateTime).toLocaleString()}
                </td>
                <td className={clsx("px-4 py-3 text-sm", text)}>{job.customerName}</td>
                <td className={clsx("px-4 py-3 text-sm capitalize", text)}>
                  {t(`booking.status.${job.status}`)}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <Link
                    to={`/vendor/jobs/${job.id}`}
                    className="text-[--color-primary] hover:underline"
                  >
                    {t("common.view")}
                  </Link>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                  {t("vendor.noJobs")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={clsx(
            "p-2 rounded focus:outline-none",
            page === 1 ? "text-gray-400 cursor-not-allowed" : "text-[--color-primary]"
          )}
          aria-label={t("vendor.prevPage")}
        >
          <FaChevronLeft />
        </button>
        <span className={clsx("text-sm", text)}>
          {t("vendor.pageIndicator", { page, total: totalPages })}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={clsx(
            "p-2 rounded focus:outline-none",
            page === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[--color-primary]"
          )}
          aria-label={t("vendor.nextPage")}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}

export default VendorJobsList
