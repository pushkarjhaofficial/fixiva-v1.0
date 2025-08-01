import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FixivaHelmet from "@/components"; // always use alias

const AdminFooter = () => {
  const { t } = useTranslation();

  return (
    <>
      <FixivaHelmet
        title={t("admin_footer_title", { defaultValue: "Fixiva Admin Footer" })}
        description={t("admin_footer_description", {
          defaultValue: "Footer section of Fixiva admin dashboard.",
        })}
        name="AdminFooter"
      />

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        role="contentinfo"
        className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-4"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 text-sm text-[var(--color-text)] sm:flex-row">
          <p className="mb-2 sm:mb-0">
            © {new Date().getFullYear()}{" "}
            {t("fixiva_admin_panel", { defaultValue: "FIXIVA Admin Panel" })}
          </p>
          <nav aria-label="footer links" className="flex space-x-4">
            <a
              href="/terms"
              className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
              tabIndex={0}
            >
              {t("footer_terms", { defaultValue: "Terms" })}
            </a>
            <a
              href="/privacy-policy"
              className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
              tabIndex={0}
            >
              {t("footer_privacy", { defaultValue: "Privacy" })}
            </a>
            <a
              href="/contact"
              className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
              tabIndex={0}
            >
              {t("footer_support", { defaultValue: "Support" })}
            </a>
          </nav>
        </div>
      </motion.footer>
    </>
  );
};export default AdminFooter;