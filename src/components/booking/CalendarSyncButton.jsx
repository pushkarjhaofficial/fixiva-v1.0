import React from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";

export function CalendarSyncButton({ bookings = [] }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  const generateICS = () => {
    const header = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "CALSCALE:GREGORIAN",
      "PRODID:-/FIXIVA/EN",
    ];

    const events = bookings.map((b) => {
      const start = new Date(b.scheduled_time)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";
      const end = new Date(new Date(b.scheduled_time).getTime() + 3600000)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z"; // +1hr

      return [
        "BEGIN:VEVENT",
        `UID:${b.id}@fixiva.com`,
        `DTSTAMP:${start}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:Fixiva - ${b.category_name}`,
        `DESCRIPTION:${b.issue_description || "Repair booking"}`,
        "END:VEVENT",
      ].join("\r\n");
    });

    const footer = ["END:VCALENDAR"];
    const icsContent = [...header, ...events, ...footer].join("\r\n");
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    saveAs(blob, "fixiva_bookings.ics");
    toast.success(t("calendar_downloaded", { defaultValue: "Calendar file downloaded!" }));
    sendBotEvent("calendar_sync_success");
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={generateICS}
      className="flex items-center gap-2 px-4 py-2 rounded bg-[--color-primary] text-white font-semibold shadow hover:bg-[--color-hover] transition"
      aria-label={t("sync_to_calendar", { defaultValue: "Sync to Calendar" })}
    >
      <CalendarPlus className="w-5 h-5" />
      {t("sync_to_calendar", { defaultValue: "Sync to Calendar" })}
    </motion.button>
  );
}


// auto‑added by add-default-exports.js
export default CalendarSyncButton;
