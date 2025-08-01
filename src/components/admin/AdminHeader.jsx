import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaBell, FaMoon, FaSun, FaBars } from "react-icons/fa";

import { useFixivaBot } from "@/hooks";
import { useTheme } from "@/hooks";
import { useSocketNotifications } from "@/hooks";
import { FixivaHelmet } from "@components/shared/FixivaHelmet";

export function AdminHeader({ onMenuClick }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();
  const { isDarkMode, toggleTheme } = useTheme();
  const { unreadCount } = useSocketNotifications("admin");

  return (
    <>
      <FixivaHelmet
        title={t("admin_header_title", { defaultValue: "Admin Header" })}
        description={t("admin_header_description", {
          defaultValue: "Navigation bar for Fixiva admin panel.",
        })}
      />

      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)] shadow-sm"
        role="banner"
      >
        <div className="flex items-center gap-4">
          <button
            aria-label={t("toggle_menu", { defaultValue: "Toggle Menu" })}
            onClick={() => {
              sendBotEvent("admin_sidebar_toggle");
              if (onMenuClick) onMenuClick();
            }}
            className="p-2 rounded-md hover:bg-[var(--color-bg-muted)] transition"
          >
            <FaBars className="text-[var(--color-text)] text-lg" />
          </button>
          <h1 className="text-xl font-bold text-[var(--color-text)]">
            {t("admin_dashboard_title", { defaultValue: "Admin Dashboard" })}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label={t("toggle_theme", { defaultValue: "Toggle Theme" })}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--color-bg-muted)] transition"
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-400" />
            )}
          </button>

          <div className="relative" aria-label="Notifications">
            <FaBell className="text-[var(--color-text)]" size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </motion.header>
    </>
  );
}


// auto‑added by add-default-exports.js
export default AdminHeader;
