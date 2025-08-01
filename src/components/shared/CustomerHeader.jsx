import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import {
  Bell, LogOut, Menu, Paintbrush, Settings, User, HelpCircle, Search
} from "lucide-react";
import FixivaHelmet from "@/components";
import { useAuth } from "@/hooks";
import { useTheme } from "@/hooks/context/useTheme";
import { useFixivaBot } from "@/hooks/context/useFixivaBot";
import avatarFallback from "@/assets/avatar-fallback.png";
import logo from "@/assets/logo.png";
// If you have a notification sound in your assets:
import notifSound from "@/assets/sounds/notification.mp3";

const languageList = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "hi", label: "HI", flag: "🇮🇳" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
];

const availableThemes = [
  { label: "Fixiva", value: "fixiva", emoji: "⚙️" },
  { label: "Dark", value: "fixiva-dark", emoji: "🌙" },
  { label: "Ocean Blue", value: "blue", emoji: "🌊" },
  { label: "Eco Green", value: "green", emoji: "🌿" },
  { label: "Alert Red", value: "red", emoji: "🔥" },
  { label: "Creative Purple", value: "purple", emoji: "💜" },
  { label: "Luxury Gold", value: "gold", emoji: "🏆" },
  { label: "Lifestyle Pink", value: "pink", emoji: "🌸" },
  { label: "Minimal Mono", value: "mono", emoji: "⚪️" },
];

// Utility: active nav
const isActive = (to, location) => location.pathname.startsWith(to);

export function CustomerHeader({ toggleSidebar }) {
  const { sendBotEvent } = useFixivaBot();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState(i18n.language || "en");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef();

  // Handle Socket Notifications
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:8000");
    socket.on("new_notification", (data) => {
      const emoji = ["🎉", "⚡️", "🛠️", "📢", "✅"][Math.floor(Math.random() * 5)];
      setNotifications((prev) => [
        { ...data, message: `${emoji} ${data.message}` },
        ...prev,
      ]);
      if (audioRef.current) audioRef.current.play();
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // Language
  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  }, [language, i18n]);

  // User Menu/Theme/Notif click outside close
  useEffect(() => {
    const handleClick = (e) => {
      setShowThemeMenu(false);
      setShowUserMenu(false);
      setShowLanguageMenu(false);
      setShowNotifPanel(false);
    };
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  // Logout
  const handleLogout = () => {
    logout();
    toast.success(t("logout_success", { defaultValue: "Logged out" }));
    navigate("/login");
  };

  return (
    <>
      <FixivaHelmet
        title={t("customer_header_title", { defaultValue: "FIXIVA - Customer" })}
        description={t("customer_header_desc", { defaultValue: "Customer navigation bar for Fixiva" })}
        name="CustomerHeader"
      />
      {/* For Notification Sound */}
      <audio ref={audioRef} src={notifSound} preload="auto" style={{ display: "none" }} />

      <header className={`sticky top-0 z-40 flex items-center bg-[var(--color-bg)] border-b border-[var(--color-border)] px-4 py-3 shadow-md`}>
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button aria-label="Open sidebar" className="sm:hidden" onClick={toggleSidebar}>
            <Menu className="h-7 w-7" />
          </button>
          <Link to="/">
            <img src={logo} alt="Fixiva Logo" className="h-10 w-auto object-contain" />
          </Link>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs text-[var(--color-muted)]">{t("welcome_back", { defaultValue: "Welcome back" })}</span>
            <span className="flex items-center gap-2 text-sm font-semibold">
              {user?.full_name || "User"}
              <span
                className={`px-2 py-0.5 text-xs rounded font-bold animate-pulse
                  ${user?.role?.toLowerCase() === "vip"
                    ? "bg-[var(--color-bg)] text-[--color-text-dark]"
                    : "bg-[var(--color-accent)] text-[--color-text-light]"}`
                }
              >
                {user?.role || "Guest"}
              </span>
            </span>
          </div>
        </div>
        {/* Middle - Nav */}
        <nav className="hidden lg:flex gap-8 text-sm font-medium ml-10">
          {[
            { to: "/customer/bookings", label: t("my_bookings", { defaultValue: "My Bookings" }) },
            { to: "/customer/profile", label: t("profile", { defaultValue: "Profile" }) },
            { to: "/customer/wallet", label: t("wallet", { defaultValue: "Wallet" }) },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className={`relative hover:text-[var(--color-accent)] ${isActive(to, location) ? "text-[var(--color-accent)]" : ""}`}>
              {label}
              {isActive(to, location) && (
                <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-[var(--color-accent)]" />
              )}
            </Link>
          ))}
        </nav>
        {/* Right Side */}
        <div className="flex items-center gap-5 ml-auto">
          {/* Theme Menu */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              aria-label="Theme Menu"
              onClick={() => setShowThemeMenu(v => !v)}
              className="hover:text-[var(--color-accent)] transition"
              title={t("change_theme", { defaultValue: "Change Theme" })}
            >
              <Paintbrush className="h-7 w-7" />
            </button>
            {showThemeMenu && (
              <ul className="absolute right-0 mt-2 w-56 bg-[var(--color-surface)] border border-[var(--color-border)] rounded shadow-[var(--color-shadow)] z-50 max-h-72 overflow-y-auto">
                {availableThemes.map((t) => (
                  <li key={t.value}>
                    <button
                      aria-label={t.label}
                      onClick={() => { setTheme(t.value); setShowThemeMenu(false); }}
                      className={`w-full px-4 py-2 flex items-center justify-between text-sm hover:bg-[var(--color-background)] transition ${theme === t.value ? "font-bold text-[var(--color-accent)]" : ""}`}
                    >
                      <span className="flex gap-2 items-center">{t.emoji} {t.label}</span>
                      {theme === t.value && <span>✔</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Language Menu */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              aria-label="Language Menu"
              onClick={() => setShowLanguageMenu(v => !v)}
              className="flex items-center gap-1 text-sm hover:text-[var(--color-accent)] transition"
            >
              {languageList.find((l) => l.code === language)?.flag}
              {language.toUpperCase()}
            </button>
            {showLanguageMenu && (
              <ul className="absolute right-0 mt-2 w-28 bg-[var(--color-surface)] border border-[var(--color-border)] rounded shadow-[var(--color-shadow)] z-50">
                {languageList.map((l) => (
                  <li key={l.code}>
                    <button
                      aria-label={l.label}
                      onClick={() => { setLanguage(l.code); setShowLanguageMenu(false); }}
                      className="w-full px-4 py-2 text-sm hover:bg-[var(--color-background)] flex items-center gap-2"
                    >
                      {l.flag} {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Notifications */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button aria-label="Notifications" onClick={() => setShowNotifPanel(v => !v)} className="relative hover:text-[var(--color-accent)] transition">
              <Bell className="h-7 w-7" />
              {notifications.length > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-1 -right-1 bg-[var(--color-error)] text-[--color-text-light] rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                >
                  {notifications.length}
                </motion.span>
              )}
            </button>
            {showNotifPanel && (
              <div className="absolute right-0 mt-2 w-80 max-h-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded shadow-[var(--color-shadow)] z-50 overflow-y-auto">
                <div className="p-3 border-b font-semibold text-sm">{t("notifications", { defaultValue: "Notifications" })}</div>
                <ul className="divide-y text-sm">
                  {notifications.length === 0
                    ? <li className="p-3 text-[var(--color-muted)]">{t("no_notifications", { defaultValue: "No notifications" })}</li>
                    : notifications.slice(0, 5).map((n, i) => (
                      <li key={i} className="p-3 hover:bg-[var(--color-background)]">{n.message}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          {/* Support */}
          <Link to="/customer/support" className="hover:text-[var(--color-accent)] transition">
            <HelpCircle className="h-7 w-7" />
          </Link>
          {/* Search (not yet implemented) */}
          <button aria-label="Search" className="hover:text-[var(--color-accent)] transition">
            <Search className="h-7 w-7" />
          </button>
          {/* User Menu */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={user?.avatar || avatarFallback}
              onClick={() => setShowUserMenu(v => !v)}
              alt="Avatar"
              className={`h-10 w-10 rounded-full border-2 cursor-pointer ${user?.role?.toLowerCase() === "vip"
                ? "border-[var(--color-border)] shadow animate-pulse"
                : "border-[var(--color-primary)]"
                }`}
            />
            {showUserMenu && (
              <ul className="absolute right-0 mt-2 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded shadow-[var(--color-shadow)] z-50 text-sm">
                <li>
                  <Link to="/customer/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--color-background)]">
                    <User size={18} /> {t("profile", { defaultValue: "Profile" })}
                  </Link>
                </li>
                <li>
                  <Link to="/customer/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--color-background)]">
                    <Settings size={18} /> {t("settings", { defaultValue: "Settings" })}
                  </Link>
                </li>
                <li>
                  <button
                    aria-label="Logout"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[var(--color-background)] text-left"
                  >
                    <LogOut size={18} /> {t("logout", { defaultValue: "Logout" })}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
    </>
  );
}


// auto‑added by add-default-exports.js
export default CustomerHeader;
