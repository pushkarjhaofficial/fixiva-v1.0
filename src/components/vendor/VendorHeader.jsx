// src/components/header/VendorHeader.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useFixivaBot } from "@/hooks";
import { FiMenu, FiX } from 'react-icons/fi';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

const navItems = [
  { key: 'dashboard',   path: '/vendor/dashboard',      labelKey: 'dashboard' },
  { key: 'bookings',    path: '/vendor/booking-details', labelKey: 'bookings' },
  { key: 'profile',     path: '/vendor/profile',        labelKey: 'profile' },
  { key: 'settings',    path: '/vendor/settings',       labelKey: 'settings' },
  { key: 'logout',      path: '/auth/login',            labelKey: 'logout' },
];

function VendorHeader() {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();
  const location = useLocation();

  const [menuOpen, setMenuOpen]     = useState(false);
  const [darkMode, setDarkMode]     = useState(false);

  // sync dark mode with <html> class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // toggle dark/light
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      sendBotEvent('vendor_header_darkmode_toggled', { enabled: next });
      return next;
    });
  }, [sendBotEvent]);

  // toggle mobile menu
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => {
      const next = !prev;
      sendBotEvent('vendor_header_menu_toggled', { open: next });
      return next;
    });
  }, [sendBotEvent]);

  return (
    <>
      <Helmet>
        <title>
          {t('vendor_panel_title', { defaultValue: 'Fixiva Vendor' })}
        </title>
      </Helmet>

      <header className="bg-[--color-bg] border-b border-[--color-border]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center space-x-2">
            <Link to="/vendor/dashboard" onClick={() => sendBotEvent('vendor_header_logo_clicked')}>
              <span className="text-xl font-bold text-[--color-text]">
                {t('vendor_panel_title', { defaultValue: 'Fixiva Vendor' })}
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ key, path, labelKey }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={key}
                  to={path}
                  onClick={() => sendBotEvent('vendor_header_nav_clicked', { key })}
                  className={`
                    text-sm font-medium transition-colors
                    ${active
                      ? 'text-[--color-text] underline'
                      : 'text-[--color-text-muted] hover:text-[--color-text]'}
                  `}
                  aria-current={active ? 'page' : undefined}
                >
                  {t(labelKey, { defaultValue: labelKey.charAt(0).toUpperCase() + labelKey.slice(1) })}
                </Link>
              );
            })}
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={
                darkMode
                  ? t('switch_to_light', { defaultValue: 'Switch to light mode' })
                  : t('switch_to_dark', { defaultValue: 'Switch to dark mode' })
              }
              className="p-1 rounded hover:bg-[--color-surface-hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {darkMode ? <IoMdSunny size={20} /> : <IoMdMoon size={20} />}
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleDarkMode}
              aria-label={
                darkMode
                  ? t('switch_to_light', { defaultValue: 'Light mode' })
                  : t('switch_to_dark', { defaultValue: 'Dark mode' })
              }
              className="p-1 mr-2 rounded hover:bg-[--color-surface-hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {darkMode ? <IoMdSunny size={20} /> : <IoMdMoon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              aria-label={t('toggle_menu', { defaultValue: 'Toggle menu' })}
              className="p-1 rounded hover:bg-[--color-surface-hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <nav className="md:hidden bg-[--color-bg] border-t border-[--color-border]">
            <ul className="space-y-1 px-2 py-3">
              {navItems.map(({ key, path, labelKey }) => {
                const active = location.pathname === path;
                return (
                  <li key={key}>
                    <Link
                      to={path}
                      onClick={() => {
                        sendBotEvent('vendor_header_nav_clicked', { key });
                        setMenuOpen(false);
                      }}
                      className={`
                        block px-4 py-2 rounded-md text-base font-medium transition-colors
                        ${active
                          ? 'bg-[--color-surface] text-[--color-text]'
                          : 'text-[--color-text-muted] hover:text-[--color-text] hover:bg-[--color-surface-hover]'}
                      `}
                      aria-current={active ? 'page' : undefined}
                    >
                      {t(labelKey, { defaultValue: labelKey.charAt(0).toUpperCase() + labelKey.slice(1) })}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

export default React.memo(VendorHeader);
