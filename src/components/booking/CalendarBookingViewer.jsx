import React from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BookingVoiceInput } from "@components";
import { QRScanner } from "@components";
import { CalendarComponent } from "@components";
import { Link } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player"; // Update this import if your Player is elsewhere

// You should provide this animation import (or use your own asset)
import emptyCalendarAnimation from "@/assets/empty-calendar.json"; // Adjust as needed

export function CalendarBookingViewer({
  bookings = [],
  selectedDate,
  onSelectDate,
  onExportICS,
}) {
  const { t } = useTranslation();

  const bookingsOnDate = selectedDate
    ? bookings.filter((b) => b.date === selectedDate)
    : [];

  return (
    <>
      {/* Export/Sync Buttons */}
      <div className="flex items-center gap-4 mt-4 mb-4">
        <button
          onClick={onExportICS}
          aria-label={t("export_ical", { defaultValue: "Export iCal" })}
          className="text-sm px-4 py-2 rounded bg-[--color-bg] text-[--color-text] border hover:bg-[--color-hover] transition"
        >
          {t("export_ical", { defaultValue: "Export iCal" })}
        </button>
        <a
          href="https://calendar.google.com/calendar/u/0/r"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("export_google", { defaultValue: "Export bookings to Google Calendar" })}
          className="text-sm text-[var(--color-text)] hover:text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded flex gap-1 items-center"
        >
          <CalendarPlus className="h-4 w-4" />
          {t("export_google", { defaultValue: "Export to Google Calendar" })}
        </a>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <CalendarPlus className="text-[var(--color-text)]" />
        <h2 className="text-lg font-semibold">{t("my_calendar", { defaultValue: "My Calendar" })}</h2>
      </div>

      <CalendarComponent highlightDates={bookings} onDateClick={onSelectDate} />

      <div className="mt-4 min-h-[180px] flex flex-col items-center justify-center text-center text-sm text-muted dark:text-[var(--color-text)]">
        {selectedDate ? (
          <>
            <h3 className="text-md font-semibold mb-2">
              {t("bookings_on_date", { defaultValue: "Bookings on" })} {selectedDate}:
            </h3>
            {bookingsOnDate.length === 0 ? (
              <>
                <Player
                  autoplay
                  loop
                  src={emptyCalendarAnimation}
                  style={{ height: 120, width: 120 }}
                />
                <p className="text-[var(--color-text)] dark:text-[var(--color-text)] mt-2">
                  {t("no_bookings_today", { defaultValue: "You have no bookings on this day." })}
                </p>
                <Link
                  to="/customer/bookings/new"
                  className="mt-4 inline-block bg-[--color-primary] text-text px-4 py-2 rounded hover:bg-[--color-hover] transition"
                >
                  {t("make_booking_now", { defaultValue: "Make a Booking Now" })}
                </Link>
              </>
            ) : (
              bookingsOnDate.map((b, i) => (
                <div key={i} className="mb-2">
                  <span className="font-medium text-[var(--color-text)]">{b.service}</span>{" "}
                  — {b.time
                    ? new Date(`${b.date}T${b.time}`).toLocaleTimeString()
                    : ""}
                </div>
              ))
            )}
          </>
        ) : (
          <>
            <Player
              autoplay
              loop
              src={emptyCalendarAnimation}
              style={{ height: 120, width: 120 }}
            />
            <p className="text-[var(--color-text)] mt-2 italic">
              {t("select_date_prompt", { defaultValue: "Select a date to view your bookings" })}
            </p>
          </>
        )}
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default CalendarBookingViewer;
