import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BookingPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const { t } = useTranslation();
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center gap-6 py-4">
      <button
        aria-label={t("pagination_prev", { defaultValue: "Previous Page" })}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        className={`px-3 py-1.5 rounded border flex items-center gap-1 transition ${
          isFirst
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[var(--color-bg)] dark:hover:bg-[var(--color-bg)]"
        }`}
      >
        <ChevronLeft size={16} />
        {t("pagination_prev", { defaultValue: "Prev" })}
      </button>

      <span className="text-muted dark:text-[var(--color-text)]">
        {t("pagination_page_of", { defaultValue: "Page" })} {currentPage} {t("pagination_of", { defaultValue: "of" })} {totalPages}
      </span>

      <button
        aria-label={t("pagination_next", { defaultValue: "Next Page" })}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        className={`px-3 py-1.5 rounded border flex items-center gap-1 transition ${
          isLast
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[var(--color-bg)] dark:hover:bg-[var(--color-bg)]"
        }`}
      >
        {t("pagination_next", { defaultValue: "Next" })}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}


// auto‑added by add-default-exports.js
export default BookingPagination;
