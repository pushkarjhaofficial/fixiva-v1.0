import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const CategoryCard = ({ title, icon, onClick }) => {
  const { t } = useTranslation();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.06, boxShadow: "0 4px 24px rgba(80,110,255,0.10)" }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center rounded-xl bg-[var(--color-bg)] p-4 shadow-[var(--color-shadow)] transition dark:bg-[var(--color-bg)] focus:outline-none"
      aria-label={t(title, { defaultValue: title })}
      tabIndex={0}
      onClick={onClick}
    >
      <div className="mb-2 text-4xl">{icon}</div>
      <h3 className="text-center text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-text-light)]">
        {t(title, { defaultValue: title })}
      </h3>
    </motion.button>
  );
};export default CategoryCard;