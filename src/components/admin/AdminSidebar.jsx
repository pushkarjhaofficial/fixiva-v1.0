import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaUsers,
  FaTools,
  FaSignOutAlt,
  FaBook,
  FaCog,
} from "react-icons/fa";

import { FixivaHelmet } from "@components/shared/FixivaHelmet";
import { useFixivaBot } from "@/hooks";

const navLinks = [
  { path: "/admin/dashboard", label: "dashboard", icon: <FaChartLine /> },
  { path: "/admin/bookings", label: "bookings", icon: <FaBook /> },
  { path: "/admin/vendors", label: "vendors", icon: <FaTools /> },
  { path: "/admin/users", label: "users", icon: <FaUsers /> },
  { path: "/admin/settings", label: "settings", icon: <FaCog /> },
];

export function AdminSidebar({ isOpen = true, onClose }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();
  const location = useLocation();

  const handleLogout = () => {
    sendBotEvent("admin_logout_clicked");
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  };

  return (
    <>
      <FixivaHelmet
        title={t("admin_sidebar_title", { defaultValue: "Admin Sidebar" })}
        description={t("admin_sidebar_description", {
          defaultValue: "Navigation for Fixiva admin users",
        })}
      />

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[var(--color-bg)] border-r border-[var(--color-border)] shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="navigation"
        aria-label="Admin sidebar"
      >
        <div className="flex flex-col h-full p-4">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">
            {t("fixiva_admin", { defaultValue: "Fixiva Admin" })}
          </h2>

          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.icon}
                  <span>
                    {t(`admin_sidebar.${link.label}`, {
                      defaultValue: link.label,
                    })}
                  </span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 px-4 py-2 rounded text-red-600 hover:bg-red-100 transition-colors"
            aria-label={t("logout", { defaultValue: "Logout" })}
          >
            <FaSignOutAlt />
            {t("logout", { defaultValue: "Logout" })}
          </button>
        </div>
      </motion.aside>
    </>
  );
}


// auto‑added by add-default-exports.js
export default AdminSidebar;
