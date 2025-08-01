import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaComments, FaCalendarCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

// Only visible on mobile
const MOBILE_BREAKPOINT = 768; // px

export default function StickyCTAFooter({ show = true, onBook, onCall, onChat, onWhatsApp }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { sendBotEvent } = useFixivaBot();
  const [visible, setVisible] = React.useState(false);

  // Show only on mobile, hide on desktop/tablet
  React.useEffect(() => {
    const handleResize = () => {
      setVisible(window.innerWidth < MOBILE_BREAKPOINT && show);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [show]);

  // Analytics
  const handleCTA = (type) => {
    sendBotEvent("sticky_cta_clicked", { type });
    switch (type) {
      case "book":
        onBook?.();
        break;
      case "call":
        onCall?.();
        window.open("tel:+919999999999"); // Change to your number
        break;
      case "chat":
        onChat?.();
        break;
      case "whatsapp":
        onWhatsApp?.();
        window.open("https://wa.me/919999999999"); // Change to your WhatsApp
        break;
      default:
        break;
    }
  };

  return (
    <>
      <FixivaHelmet
        title={t("cta_footer_title", { defaultValue: "Quick Actions" })}
        description={t("cta_footer_desc", { defaultValue: "Instantly book, call, chat or WhatsApp for help." })}
        name="StickyCTAFooter"
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="fixed inset-x-0 bottom-0 z-50 flex w-full items-center justify-around gap-1 border-t border-[var(--color-border)] bg-[var(--color-bg-blur)]/80 backdrop-blur-sm px-3 py-2 shadow-lg md:hidden"
            role="contentinfo"
            aria-label={t("quick_action_bar", { defaultValue: "Quick Action Bar" })}
          >
            <button
              className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-xs text-white shadow hover:bg-[var(--color-accent)] focus:outline-none"
              onClick={() => handleCTA("book")}
              aria-label={t("book_now", { defaultValue: "Book Now" })}
            >
              <FaCalendarCheck size={20} />
              {t("book_now", { defaultValue: "Book Now" })}
            </button>
            <button
              className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[var(--color-success)] px-3 py-2 text-xs text-white shadow hover:bg-[var(--color-accent-light)] focus:outline-none"
              onClick={() => handleCTA("call")}
              aria-label={t("call_us", { defaultValue: "Call Us" })}
            >
              <FaPhoneAlt size={20} />
              {t("call_us", { defaultValue: "Call Us" })}
            </button>
            <button
              className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[var(--color-info)] px-3 py-2 text-xs text-white shadow hover:bg-[var(--color-accent)] focus:outline-none"
              onClick={() => handleCTA("chat")}
              aria-label={t("chat_now", { defaultValue: "Chat Now" })}
            >
              <FaComments size={20} />
              {t("chat_now", { defaultValue: "Chat Now" })}
            </button>
            <button
              className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[var(--color-success-dark)] px-3 py-2 text-xs text-white shadow hover:bg-[var(--color-accent-dark)] focus:outline-none"
              onClick={() => handleCTA("whatsapp")}
              aria-label={t("whatsapp_us", { defaultValue: "WhatsApp" })}
            >
              <FaWhatsapp size={20} />
              {t("whatsapp", { defaultValue: "WhatsApp" })}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
