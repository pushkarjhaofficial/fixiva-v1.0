import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Calendar as RBCalendar, momentLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";

// Optionally, pass locales here if you want i18n for the calendar
const localizer = {
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {},
};

const localizerInstance = {
  ...localizer,
};

export function AdvancedCalendar({ events = [] }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const defaultDate = useMemo(() => new Date(), []);

  return (
    <>
      <FixivaHelmet
        title={t("component_title", { defaultValue: "Doctor Appointments" })}
        description={t("component_tooltip", { defaultValue: "Doctor appointment calendar view." })}
        name="AdvancedCalendar"
      />

      <div className="flex gap-6">
        {/* Sidebar List */}
        <div className="w-1/4 p-4 bg-[--color-bg] rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {t("doctor_appointment_list", { defaultValue: "Doctor Appointment List" })}
          </h2>
          {events.map((event) => (
            <div key={event.id} className="mb-4 flex items-center gap-3">
              {event.doctorAvatar && (
                <img
                  src={event.doctorAvatar}
                  alt={event.doctorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium">{event.doctorName}</p>
                <p className="text-sm text-[var(--color-text)]">
                  {event.specialty}
                </p>
                <p className="text-xs text-[var(--color-text)]">
                  {format(new Date(event.start), "HH:mm")} - {format(new Date(event.end), "HH:mm")}
                </p>
              </div>
            </div>
          ))}
          <button
            aria-label="See all appointments"
            className="mt-6 w-full py-2 bg-[var(--color-bg)] text-[--color-text-light] rounded hover:bg-[var(--color-bg)] transition"
          >
            {t("see_all", { defaultValue: "See All" })}
          </button>
        </div>

        {/* Calendar View */}
        <div className="flex-1 bg-[--color-bg] rounded-lg shadow p-4">
          <RBCalendar
            localizer={localizerInstance}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            defaultView="week"
            views={["week", "day", "month"]}
            onSelectEvent={handleSelectEvent}
            selectable
            defaultDate={defaultDate}
          />

          {selectedEvent && (
            <div className="mt-4 p-4 border rounded shadow bg-[var(--color-bg)]">
              <h3 className="font-semibold mb-2">{selectedEvent.title}</h3>
              <p>
                <strong>Time: </strong>
                {format(new Date(selectedEvent.start), "PPpp")} -{" "}
                {format(new Date(selectedEvent.end), "PPpp")}
              </p>
              <p>
                <strong>Doctor: </strong>
                {selectedEvent.doctorName}
              </p>
              <button
                aria-label="Close"
                onClick={() => setSelectedEvent(null)}
                className="mt-2 px-3 py-1 bg-[var(--color-bg)] text-[--color-text-light] rounded hover:bg-[var(--color-bg)]"
              >
                {t("close", { defaultValue: "Close" })}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default AdvancedCalendar;
