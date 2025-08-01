import React from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCopy, FaGift } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

const OfferDetailsModal = ({ show, onClose, offer }) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  if (!offer) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    toast.success(t("coupon_code_copied", { defaultValue: "Coupon code copied!" }));
    sendBotEvent("offer_code_copied", { code: offer.code });
  };

  const handleApply = () => {
    toast.success(t("coupon_applied", { defaultValue: "Coupon applied!" }));
    sendBotEvent("offer_applied", { code: offer.code });
    onClose?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("offer_details_title", { defaultValue: "Offer Details" })}
        description={t("offer_details_desc", { defaultValue: "See offer code, details, and terms." })}
        name="OfferDetailsModal"
      />

      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-dark)]/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-sm rounded-xl bg-[var(--color-bg)] p-6 shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-label={t("offer_details_aria", { defaultValue: "Offer Details Modal" })}
            >
              {/* Close button */}
              <button
                aria-label={t("close", { defaultValue: "Close" })}
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-[var(--color-bg-muted)] p-2 text-lg text-[var(--color-text)] hover:bg-[var(--color-bg)]"
                type="button"
              >
                <FaTimes />
              </button>

              {/* Offer Title */}
              <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <FaGift className="text-[var(--color-primary)]" />
                {offer.title}
              </div>

              {/* Offer Image */}
              {offer.image && (
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="mb-4 h-40 w-full rounded-lg object-cover"
                />
              )}

              {/* Coupon Code with Copy */}
              <div className="mb-3 flex items-center justify-between rounded-lg bg-[var(--color-bg)] p-3">
                <span className="font-mono tracking-widest text-[var(--color-text)]">
                  {offer.code}
                </span>
                <button
                  aria-label={t("copy_coupon_code", { defaultValue: "Copy coupon code" })}
                  onClick={handleCopy}
                  className="text-sm text-[var(--color-text)] hover:text-[var(--color-primary)]"
                  type="button"
                >
                  <FaCopy />
                </button>
              </div>

              {/* Offer Description */}
              <p className="mb-2 text-sm text-[var(--color-text)]">{offer.description}</p>

              {/* Offer Details List */}
              <ul className="mb-4 space-y-1 text-xs text-[var(--color-text)]">
                <li>
                  ✅ {t("valid_till", { defaultValue: "Valid till:" })} <b>{offer.expiry}</b>
                </li>
                <li>
                  💰 {t("min_booking", { defaultValue: "Minimum booking:" })} ₹{offer.min_order}
                </li>
                {offer.max_discount && (
                  <li>
                    🎯 {t("max_discount", { defaultValue: "Max discount:" })} ₹{offer.max_discount}
                  </li>
                )}
                {offer.terms && (
                  <li>
                    📋 {t("terms", { defaultValue: "Terms:" })} {offer.terms}
                  </li>
                )}
              </ul>

              {/* Apply Coupon */}
              <button
                aria-label={t("apply_coupon", { defaultValue: "Apply Coupon" })}
                onClick={handleApply}
                className="w-full rounded-lg bg-[var(--color-primary)] py-2 text-[var(--color-text-light)] hover:bg-[var(--color-accent)] transition"
                type="button"
              >
                {t("apply_coupon", { defaultValue: "Apply Coupon" })}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};export default OfferDetailsModal;