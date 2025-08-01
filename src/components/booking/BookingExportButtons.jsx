import React from "react";
import { useTranslation } from "react-i18next";
import { FileDown, CalendarDays } from "lucide-react";

export function BookingExportButtons({ onPDF, onCalendar }) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2">
      <button
        aria-label={t("export_pdf", { defaultValue: "Export PDF" })}
        onClick={onPDF}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted dark:bg-foreground hover:shadow text-sm"
      >
        <FileDown className="w-4 h-4" /> {t("export_pdf", { defaultValue: "PDF" })}
      </button>
      <button
        aria-label={t("add_to_calendar", { defaultValue: "Add to Calendar" })}
        onClick={onCalendar}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted dark:bg-foreground hover:shadow text-sm"
      >
        <CalendarDays className="w-4 h-4" /> {t("add_to_calendar", { defaultValue: "Calendar" })}
      </button>
    </div>
  );
}
export default BookingExportButtons;
