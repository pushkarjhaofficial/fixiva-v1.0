// src/components/sidebar/VendorSidebar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import socketIOClient from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { useFixivaBot } from "@/hooks";
import { FiMenu } from 'react-icons/fi';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:8000';

const navItems = [
  { key: 'dashboard', labelKey: 'dashboard', icon: <FaHome />, path: '/vendor/dashboard' },
  { key: 'profile',   labelKey: 'profile',   icon: <FaUser />, path: '/vendor/profile' },
  { key: 'settings',  labelKey: 'settings',  icon: <FaCog />,  path: '/vendor/settings' },
  { key: 'logout',    labelKey: 'logout',    icon: <FaSignOutAlt />, path: '/vendor/login' },
];

function VendorSidebar() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingAlert, setBookingAlert] = useState(false);

  // Toggle dark/light mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode((mode) => {
      const next = !mode;
      sendBotEvent('vendor_dark_mode_toggled', { enabled: next });
      return next;
    });
  }, [sendBotEvent]);

  // Toggle sidebar on mobile
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((open) => {
      const next = !open;
      sendBotEvent('vendor_sidebar_toggled', { open: next });
      return next;
    });
  }, [sendBotEvent]);

  // Apply CSS class for dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Listen for new booking alerts via WebSocket
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports: ['websocket'] });
    socket.on('new_booking', () => {
      setBookingAlert(true);
      sendBotEvent('vendor_new_booking_alert');
    });
    return () => {
      socket.disconnect();
    };
  }, [sendBotEvent]);

  return (
    <>
      {/* SEO / Document title */}
      <Helmet>
        <title>{t('vendor_panel_title', { defaultValue: 'Vendor Panel' })}</title>
      </Helmet>

      {/* Top bar (mobile) */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[--color-bg] dark:bg-[--color-bg] border-b border-[--color-border]">
        <button
          onClick={toggleSidebar}
          aria-label={t('toggle_menu', { defaultValue: 'Toggle menu' })}
          className="text-[--color-text]"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-[--color-text]">
          {t('vendor_panel_title', { defaultValue: 'Vendor Panel' })}
        </h1>
        <button
          onClick={toggleDarkMode}
          aria-label={
            darkMode
              ? t('switch_to_light', { defaultValue: 'Switch to light mode' })
              : t('switch_to_dark', { defaultValue: 'Switch to dark mode' })
          }
          className="text-[--color-text]"
        >
          {darkMode ? <IoMdSunny size={24} /> : <IoMdMoon size={24} />}
        </button>
      </header>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform
          bg-[--color-bg] text-[--color-text-light] border-r border-[--color-border]
          transition-transform duration-200 ease-in-out
          md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        role="navigation"
        aria-label={t('vendor_navigation', { defaultValue: 'Vendor navigation' })}
      >
        <div className="flex items-center justify-between p-4 border-b border-[--color-border]">
          <h2 className="text-xl font-bold text-[--color-text]">
            {t('vendor_panel_title', { defaultValue: 'Vendor Panel' })}
          </h2>
          <button
            onClick={toggleDarkMode}
            aria-label={
              darkMode
                ? t('switch_to_light', { defaultValue: 'Switch to light mode' })
                : t('switch_to_dark', { defaultValue: 'Switch to dark mode' })
            }
            className="text-[--color-text]"
          >
            {darkMode ? <IoMdSunny size={20} /> : <IoMdMoon size={20} />}
          </button>
        </div>

        <nav className="mt-6 space-y-1">
          {navItems.map(({ key, labelKey, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={key}
                to={path}
                onClick={() => {
                  if (key === 'logout') sendBotEvent('vendor_logout_clicked');
                  if (sidebarOpen) toggleSidebar();
                }}
                className={`
                  flex items-center gap-3 px-6 py-2 rounded-md text-sm font-medium
                  transition-colors
                  ${isActive
                    ? 'bg-[--color-surface] text-[--color-text]'
                    : 'hover:bg-[--color-surface-hover]'}
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {icon}
                {t(labelKey, { defaultValue: labelKey.charAt(0).toUpperCase() + labelKey.slice(1) })}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-6">
          <button
            onClick={() => {
              setBookingAlert(false);
              sendBotEvent('vendor_alerts_cleared');
            }}
            disabled={!bookingAlert}
            className="
              flex w-full items-center justify-center gap-2 py-2 rounded-md
              bg-[--color-notification] text-white
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:opacity-90 transition
            "
            aria-label={t('clear_booking_alerts', { defaultValue: 'Clear booking alerts' })}
          >
            <FaBell />
            {t('new_bookings', { defaultValue: 'New Bookings' })}
            {bookingAlert && <span className="ml-auto inline-block h-2 w-2 animate-ping rounded-full bg-white" />}
          </button>
        </div>
      </aside>
    </>
  );
}

export default React.memo(VendorSidebar);
