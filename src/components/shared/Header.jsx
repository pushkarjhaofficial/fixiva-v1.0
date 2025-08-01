import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFixivaBot, useTheme } from "@/hooks";
import FixivaHelmet from "@/components";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const toggleTheme = () => setTheme(isDarkMode ? "light" : "dark");

  React.useEffect(() => {
    sendBotEvent?.("header_rendered");
  }, [sendBotEvent]);

  return (
    <>
      <FixivaHelmet
        title={t("header_title", { defaultValue: "Fixiva" })}
        description={t("header_desc", { defaultValue: "Fixiva navigation header" })}
        name="Header"
      />
      <header className="sticky top-0 z-40 bg-[var(--color-bg)] border-b border-[var(--color-border)] shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-[var(--color-primary)] tracking-wide"
            aria-label={t("go_home", { defaultValue: "Go Home" })}
          >
            Fixiva
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-[var(--color-primary)] transition">{t("home", { defaultValue: "Home" })}</Link>
            <Link to="/services" className="hover:text-[var(--color-primary)] transition">{t("services", { defaultValue: "Services" })}</Link>
            <Link to="/about" className="hover:text-[var(--color-primary)] transition">{t("about_us", { defaultValue: "About Us" })}</Link>
            <Link to="/faq" className="hover:text-[var(--color-primary)] transition">{t("faq", { defaultValue: "FAQ" })}</Link>
            <Link to="/contact" className="hover:text-[var(--color-primary)] transition">{t("contact", { defaultValue: "Contact" })}</Link>
            <button
              aria-label={isDarkMode ? t("switch_to_light", { defaultValue: "Switch to light mode" }) : t("switch_to_dark", { defaultValue: "Switch to dark mode" })}
              onClick={toggleTheme}
              className="ml-3 text-lg hover:text-[var(--color-accent)] transition"
              type="button"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <Link to="/login" className="bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-1.5 rounded-md hover:bg-[var(--color-accent)] hover:text-[var(--color-text-light)] transition">
              {t("login", { defaultValue: "Login" })}
            </Link>
            <Link to="/register" className="border border-[var(--color-primary)] px-4 py-1.5 rounded-md hover:bg-[var(--color-primary)] hover:text-[var(--color-text-light)] transition">
              {t("become_partner", { defaultValue: "Become a Partner" })}
            </Link>
          </nav>
          {/* Mobile Hamburger */}
          <button
            aria-label={t("open_menu", { defaultValue: "Open menu" })}
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            <FaBars />
          </button>
        </div>
        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[var(--color-bg)] border-t border-[var(--color-border)] text-sm px-4 py-4 space-y-3 shadow-lg"
            >
              <Link to="/" className="block hover:text-[var(--color-primary)]" onClick={() => setMenuOpen(false)}>
                {t("home", { defaultValue: "Home" })}
              </Link>
              <Link to="/services" className="block hover:text-[var(--color-primary)]" onClick={() => setMenuOpen(false)}>
                {t("services", { defaultValue: "Services" })}
              </Link>
              <Link to="/about" className="block hover:text-[var(--color-primary)]" onClick={() => setMenuOpen(false)}>
                {t("about_us", { defaultValue: "About Us" })}
              </Link>
              <Link to="/faq" className="block hover:text-[var(--color-primary)]" onClick={() => setMenuOpen(false)}>
                {t("faq", { defaultValue: "FAQ" })}
              </Link>
              <Link to="/contact" className="block hover:text-[var(--color-primary)]" onClick={() => setMenuOpen(false)}>
                {t("contact", { defaultValue: "Contact" })}
              </Link>
              <button
                aria-label={isDarkMode ? t("switch_to_light", { defaultValue: "Switch to light mode" }) : t("switch_to_dark", { defaultValue: "Switch to dark mode" })}
                onClick={toggleTheme}
                className="block mt-2 text-lg"
                type="button"
              >
                {isDarkMode ? "🌞 " + t("light_mode", { defaultValue: "Light Mode" }) : "🌙 " + t("dark_mode", { defaultValue: "Dark Mode" })}
              </button>
              <div className="flex flex-col gap-2 pt-3">
                <Link to="/login" className="bg-[var(--color-bg)] text-[var(--color-text)] px-4 py-1.5 rounded-md text-center">
                  {t("login", { defaultValue: "Login" })}
                </Link>
                <Link to="/register" className="border border-[var(--color-primary)] px-4 py-1.5 rounded-md text-center hover:bg-[var(--color-primary)] hover:text-[var(--color-text-light)] transition">
                  {t("become_partner", { defaultValue: "Become a Partner" })}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}


// auto‑added by add-default-exports.js
export default Header;
