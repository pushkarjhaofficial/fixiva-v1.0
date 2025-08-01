import React, { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { X, Percent } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

export function ApplyCouponModal({ isOpen, onClose, onApply }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!coupon.trim()) {
      toast.error(t("enter_valid_coupon", { defaultValue: "Please enter a valid coupon code." }));
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Replace with real validation logic:
      const success = coupon.toUpperCase() === "FIXIVA100";
      if (success) {
        toast.success(t("coupon_applied", { defaultValue: "Coupon applied! ₹100 cashback added." }));
        sendBotEvent("coupon_applied", { coupon });
        onApply?.(coupon);
        onClose?.();
      } else {
        toast.error(t("invalid_coupon_code", { defaultValue: "Invalid coupon code." }));
        sendBotEvent("coupon_failed", { coupon });
      }
    } catch (err) {
      toast.error(t("failed_apply_coupon", { defaultValue: "Failed to apply coupon. Try again." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FixivaHelmet
        title={t("apply_coupon_title", { defaultValue: "Apply Coupon" })}
        description={t("apply_coupon_desc", { defaultValue: "Enter your coupon code to get instant cashback or discount." })}
        name="ApplyCouponModal"
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-[var(--color-bg-dark)]/50 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <PercentCircle className="text-[var(--color-text)]" />
                      {t("apply_coupon", { defaultValue: "Apply Coupon" })}
                    </h3>
                    <button
                      aria-label={t("close", { defaultValue: "Close" })}
                      onClick={onClose}
                      className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition"
                      type="button"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder={t("enter_coupon_code", { defaultValue: "Enter coupon code" })}
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      aria-label={t("coupon_code", { defaultValue: "Coupon code" })}
                      disabled={loading}
                    />
                    <button
                      onClick={handleApply}
                      disabled={loading}
                      className="w-full py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-[var(--color-text-light)] font-semibold transition"
                      aria-label={t("apply_coupon", { defaultValue: "Apply Coupon" })}
                      type="button"
                    >
                      {loading ? t("applying", { defaultValue: "Applying..." }) : t("apply_coupon", { defaultValue: "Apply Coupon" })}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}


// auto‑added by add-default-exports.js
export default ApplyCouponModal;
