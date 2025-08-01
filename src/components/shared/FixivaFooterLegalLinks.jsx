import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FixivaHelmet from "@/components";

const FixivaFooterLegalLinks = ({ className = "" }) => {
  const { t } = useTranslation();

  return (
    <>
      <FixivaHelmet
        title={t("legal_links_title", { defaultValue: "Legal & Policies" })}
        description={t("legal_links_desc", { defaultValue: "View our terms, privacy policy, and more." })}
        name="FixivaFooterLegalLinks"
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.22 }}
        className={`flex flex-col gap-2 text-xs text-[var(--color-text)] ${className}`}
        aria-label={t("footer_legal_links_aria", { defaultValue: "Legal and Policy Links" })}
      >
        <Link to="/terms" className="hover:underline focus:underline" tabIndex={0}>
          {t("terms_and_conditions", { defaultValue: "Terms & Conditions" })}
        </Link>
        <Link to="/privacy-policy" className="hover:underline focus:underline" tabIndex={0}>
          {t("privacy_policy", { defaultValue: "Privacy Policy" })}
        </Link>
        <Link to="/refund-policy" className="hover:underline focus:underline" tabIndex={0}>
          {t("refund_policy", { defaultValue: "Refund Policy" })}
        </Link>
        <Link to="/disclaimer" className="hover:underline focus:underline" tabIndex={0}>
          {t("disclaimer", { defaultValue: "Disclaimer" })}
        </Link>
      </motion.div>
    </>
  );
};export default FixivaFooterLegalLinks;