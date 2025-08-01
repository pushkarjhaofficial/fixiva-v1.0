import React from "react";
import { motion } from "framer-motion";
import {
  FaGlassCheers,
  FaMoon,
  FaWater,
  FaLeaf,
  FaFire,
  FaPaintBrush,
  FaCrown,
  FaHeart,
  FaCircle,
} from "react-icons/fa";
import { useTheme } from "@/hooks"; // Adjust if your alias is different
import { useTranslation } from "react-i18next";

const themeIcons = {
  fixiva: <FaGlassCheers />,
  "fixiva-dark": <FaMoon />,
  blue: <FaWater />,
  green: <FaLeaf />,
  red: <FaFire />,
  purple: <FaPaintBrush />,
  gold: <FaCrown />,
  pink: <FaHeart />,
  mono: <FaCircle />,
};

const ThemeSwitcherButton = ({ floating = true }) => {
  const { theme, setTheme, themeLabel, themes } = useTheme();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("fixiva-theme", selectedTheme);
  };

  return (
    <motion.div
      className={`${
        floating
          ? "fixed right-4 bottom-4 z-40 bg-white dark:bg-black/80 shadow-lg rounded-full flex items-center px-3 py-2"
          : "inline-flex items-center"
      } border border-[var(--color-border)] backdrop-blur-md`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      role="group"
      aria-label={t("theme_switcher", "Theme Switcher")}
      tabIndex={0}
    >
      <span className="mr-2 text-lg" aria-label={themeLabel}>
        {themeIcons[theme] || <FaCircle />}
      </span>
      <select
        value={theme}
        onChange={handleChange}
        className="bg-transparent text-sm text-textPrimary dark:text-white outline-none cursor-pointer px-2 py-1 rounded"
        aria-label={t("select_theme", "Select theme")}
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {themeIcons[t] && "\u00A0"}
            {t === "fixiva"
              ? t("theme_fixiva", "Fixiva")
              : t === "fixiva-dark"
                ? t("theme_dark", "Dark")
                : t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </motion.div>
  );
};export default ThemeSwitcherButton;