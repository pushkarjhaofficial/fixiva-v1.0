import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Modal } from "@/components"; // Update this path if needed
import axios from "axios";
import { toast } from "react-hot-toast";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export function CalendarComponent() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  const [bookings, setBookings] = useState([]);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupBooking, setPopupBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/customer/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Booking fetch error:", err);
      toast.error(
        t("booking_fetch_error", {
          defaultValue: "Failed to fetch bookings.",
        })
      );
    }
  };

  const getDotColor = (status) => {
    if (status === "completed") return "bg-green-500";
    if (status === "pending") return "bg-yellow-500";
    return "bg-gray-400";
  };

  const handleDateClick = (date) => {
    const clicked = format(date, "yyyy-MM-dd");
    const b = bookings.find(
      (bk) => format(new Date(bk.date), "yyyy-MM-dd") === clicked
    );
    if (b) {
      setPopupBooking(b);
      setSelectedDate(date);
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.service &&
      b.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGoogleSync = () => {
    window.open(
      "https://calendar.google.com/calendar/u/0/r/eventedit",
      "_blank"
    );
  };

  return (
    <>
      <FixivaHelmet
        title={t("calendar_component", { defaultValue: "My Appointments Calendar" })}
        description={t("calendar_component_desc", {
          defaultValue: "View, search, and manage your Fixiva service appointments.",
        })}
        name="CalendarComponent"
      />
      <div className="w-full">
        <div className="border border-[var(--color-border)] dark:border-[var(--color-border)] rounded-md shadow overflow-hidden w-full">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setSelectionRange(item.selection)}
            moveRangeOnFirstSelection={false}
            ranges={[selectionRange]}
            months={2}
            direction="horizontal"
            rangeColors={["#6366f1"]}
            className="w-full"
            showDateDisplay={false}
            onRangeFocusChange={() => {}}
            dayContentRenderer={(date) => {
              const d = format(date, "yyyy-MM-dd");
              const booking = bookings.find(
                (b) => format(new Date(b.date), "yyyy-MM-dd") === d
              );
              return (
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleDateClick(date)}
                >
                  <div>{date.getDate()}</div>
                  {booking && (
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${getDotColor(
                        booking.status
                      )}`}
                    />
                  )}
                </div>
              );
            }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-start gap-3 mt-4">
          <button
            aria-label={t("export_google", { defaultValue: "Export to Google Calendar" })}
            onClick={handleGoogleSync}
            className="bg-[--color-primary] text-[--color-text-light] px-4 py-1 rounded hover:bg-[--color-hover] text-sm"
          >
            {t("export_google", { defaultValue: "Export to Google Calendar" })}
          </button>
          <button
            aria-label={t("export_ical", { defaultValue: "Export to iCal" })}
            onClick={() =>
              alert(
                t("ical_not_implemented", {
                  defaultValue: "iCal export not implemented",
                })
              )
            }
            className="bg-[var(--color-bg)] text-[--color-text-light] px-4 py-1 rounded hover:bg-[var(--color-bg)] text-sm"
          >
            {t("export_ical", { defaultValue: "Export to iCal" })}
          </button>
          <input
            type="text"
            placeholder={t("search_appointments", { defaultValue: "Search appointments..." })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] border px-3 py-1 rounded text-sm dark:bg-[var(--color-bg)] dark:text-[--color-text-light]"
          />
        </div>

        <div className="mt-3 w-full border rounded px-3 py-2 dark:border-[var(--color-border)]">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((b, idx) => (
              <div
                key={idx}
                className="text-sm py-1 border-b last:border-b-0 border-[var(--color-border)] dark:border-[var(--color-border)]"
              >
                {format(new Date(b.date), "do MMM yyyy")} —{" "}
                <span className="font-medium">{b.service}</span> (
                {b.status && b.status.toUpperCase()})
              </div>
            ))
          ) : (
            <p className="italic text-[var(--color-text)] text-sm">
              {t("no_appointments_found", { defaultValue: "No appointments found." })}
            </p>
          )}
        </div>

        {popupBooking && (
          <Modal
            onClose={() => setPopupBooking(null)}
            title={t("booking_details", { defaultValue: "Booking Details" })}
          >
            <div className="space-y-2 text-sm">
              <p>
                <strong>{t("service", { defaultValue: "Service" })}:</strong> {popupBooking.service}
              </p>
              <p>
                <strong>{t("date", { defaultValue: "Date" })}:</strong>{" "}
                {format(new Date(popupBooking.date), "PPPPpp")}
              </p>
              <p>
                <strong>{t("status", { defaultValue: "Status" })}:</strong>{" "}
                <span className="uppercase">{popupBooking.status}</span>
              </p>
              <p>
                <strong>{t("category", { defaultValue: "Category" })}:</strong> {popupBooking.category || "—"}
              </p>
              <p>
                <strong>{t("vendor", { defaultValue: "Vendor" })}:</strong> {popupBooking.vendor || "—"}
              </p>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default CalendarComponent;
