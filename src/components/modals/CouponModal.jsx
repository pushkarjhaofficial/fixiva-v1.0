import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

export function CouponModal({
  open,
  onClose,
  coupon = "WELCOME50",
  discount = "50%",
  note,
}) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  const handleClose = () => {
    sendBotEvent("coupon_modal_closed", { coupon });
    onClose?.();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon);
    toast.success(t("coupon_code_copied", { defaultValue: "Coupon code copied!" }));
    sendBotEvent("coupon_code_copied", { coupon });
  };

  return (
    <>
      <FixivaHelmet
        title={t("coupon_unlocked_title", { defaultValue: "Special Coupon Unlocked" })}
        description={t("coupon_unlocked_desc", { defaultValue: "You have unlocked a special coupon for your next booking." })}
        name="CouponModal"
      />
      <AnimatePresence>
        {open && (
          <Dialog
            as="div"
            open={open}
            onClose={handleClose}
            className="relative z-50"
            static
          >
            <div className="fixed inset-0 bg-[var(--color-bg-dark)]/50 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 32 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 32 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="relative w-full max-w-xs rounded-xl bg-[var(--color-bg)] p-6 shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label={t("coupon_modal_aria", { defaultValue: "Coupon Modal" })}
              >
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 rounded-full p-2 text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]"
                  aria-label={t("close_modal", { defaultValue: "Close Modal" })}
                  type="button"
                >
                  <X size={22} />
                </button>

                {/* Title */}
                <Dialog.Title className="mb-2 text-center text-xl font-bold text-[var(--color-text)]">
                  🎁 {t("special_coupon_unlocked", { defaultValue: "Special Coupon Unlocked!" })}
                </Dialog.Title>

                {/* Description */}
                <p className="mb-4 text-center text-sm text-[var(--color-muted)]">
                  {t("use_code_to_get_discount", {
                    defaultValue: "Use code",
                  })}{" "}
                  <span
                    className="mx-1 inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] cursor-pointer"
                    onClick={handleCopy}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleCopy();
                    }}
                    aria-label={t("copy_coupon_code", { defaultValue: "Copy coupon code" })}
                    style={{ userSelect: "all" }}
                  >
                    {coupon}
                  </span>
                  {t("to_get_discount_off", { defaultValue: "to get" })}{" "}
                  <span className="font-semibold text-[var(--color-primary)]">{discount}</span>{" "}
                  {t("off_on_next_booking", { defaultValue: "OFF on your next booking." })}
                </p>

                {/* Optional Note */}
                {note && (
                  <p className="mb-4 text-center text-xs italic text-[var(--color-text)]">{note}</p>
                )}

                {/* CTA */}
                <div className="flex justify-center">
                  <button
                    onClick={handleClose}
                    className="rounded bg-[var(--color-primary)] px-5 py-2 text-[var(--color-text-light)] shadow hover:bg-[var(--color-accent)] transition"
                    aria-label={t("got_it", { defaultValue: "Got it!" })}
                    type="button"
                  >
                    {t("got_it", { defaultValue: "Got it!" })}
                  </button>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}


// auto‑added by add-default-exports.js
export default CouponModal;
