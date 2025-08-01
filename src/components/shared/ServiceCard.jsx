import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ name, icon, onClick }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.14)" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="flex flex-col items-center rounded-xl bg-[var(--color-bg)] p-4 shadow-sm transition-all cursor-pointer hover:shadow-[var(--color-shadow)]"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={t("service_card", { defaultValue: name })}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <div className="mb-2 text-3xl text-[var(--color-primary)]">{icon}</div>
      <h3 className="text-center text-sm font-medium text-[var(--color-text)]">
        {t(name, { defaultValue: name })}
      </h3>
    </motion.div>
  );
};export default ServiceCard;