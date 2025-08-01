import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { FaCog, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks";
import { useAuth } from "@/hooks";
import FixivaHelmet from "@/components";

// Theme and language options
const themes = ["glass", "light", "amoled"];
const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

// Example sidebar items - you should replace with your real sidebar/nav structure
const fullNavItems = [
  { name: "Dashboard", icon: <FaCog />, roles: ["customer", "admin"], enabled: true },
  { name: "Bookings", icon: <FaCog />, roles: ["customer"], enabled: true },
  { name: "Vendors", icon: <FaCog />, roles: ["admin"], enabled: false },
];

const SettingsModal = ({ open, setOpen }) => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    // Role-based nav items
    const role = user?.role || "customer";
    const filtered = fullNavItems.filter((item) => item.roles.includes(role));
    setVisibleItems(filtered);
  }, [user]);

  const handleThemeChange = (e) => setTheme(e.target.value);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
  };

  const toggleItem = (name) => {
    setVisibleItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <FixivaHelmet
        title={t("settings_modal_title", { defaultValue: "User Settings" })}
        description={t("settings_modal_desc", { defaultValue: "User preferences, language, and theme." })}
        name="SettingsModal"
      />
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {open && (
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[var(--color-bg)] p-6 shadow-xl focus:outline-none"
                aria-label={t("settings_modal_aria", { defaultValue: "User Settings Modal" })}
              >
                <Dialog.Title className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <FaCog className="text-cyan-400" />
                  {t("user_settings", { defaultValue: "User Settings" })}
                </Dialog.Title>
                <div className="mb-4">
                  <span className="text-sm text-[var(--color-text)]">{t("role", { defaultValue: "Role:" })}</span>{" "}
                  <span className="badge-role capitalize">{user?.role || "guest"}</span>
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium" htmlFor="settings-theme-select">
                    {t("theme", { defaultValue: "Theme" })}
                  </label>
                  <select
                    id="settings-theme-select"
                    value={theme}
                    onChange={handleThemeChange}
                    className="w-full rounded bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text-light)]"
                    aria-label={t("theme_select_aria", { defaultValue: "Select theme" })}
                  >
                    {themes.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium" htmlFor="settings-lang-select">
                    {t("language", { defaultValue: "Language" })}
                  </label>
                  <select
                    id="settings-lang-select"
                    value={i18n.language}
                    onChange={handleLanguageChange}
                    className="w-full rounded bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text-light)]"
                    aria-label={t("language_select_aria", { defaultValue: "Select language" })}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold">
                    {t("sidebar_menu_visibility", { defaultValue: "Sidebar Menu Visibility" })}
                  </h3>
                  <div className="max-h-40 space-y-2 overflow-y-auto pr-1">
                    {visibleItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded bg-[var(--color-bg)] px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <button
                          aria-label={t("toggle_menu_item", { defaultValue: "Toggle Menu Item" })}
                          onClick={() => toggleItem(item.name)}
                          className="text-xl"
                          type="button"
                        >
                          {item.enabled ? (
                            <FaToggleOn className="text-[var(--color-text)]" />
                          ) : (
                            <FaToggleOff className="text-[var(--color-text)]" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Dialog.Close asChild>
                    <button
                      aria-label={t("close_settings", { defaultValue: "Close Settings" })}
                      className="rounded bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-500"
                      type="button"
                    >
                      {t("close", { defaultValue: "Close" })}
                    </button>
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};export default SettingsModal;