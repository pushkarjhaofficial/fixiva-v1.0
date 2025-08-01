import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

export default function ScrollToTopButton() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    sendBotEvent("scroll_to_top_clicked");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <FixivaHelmet
        title={t("scroll_to_top_title", { defaultValue: "Scroll to Top" })}
        description={t("scroll_to_top_desc", { defaultValue: "Instantly return to top of page." })}
        name="ScrollToTopButton"
      />
      <AnimatePresence>
        {visible && (
          <motion.button
            key="scrolltotop"
            initial={{ opacity: 0, scale: 0.7, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            aria-label={t("scroll_to_top", { defaultValue: "Scroll to top" })}
            onClick={handleClick}
            className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-[var(--color-primary)] p-3 text-white shadow-lg hover:bg-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}
          >
            <FaArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
