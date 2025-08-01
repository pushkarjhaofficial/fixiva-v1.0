import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks"; // adjust path

export function WithdrawModal({ isOpen, onClose, onWithdraw }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error(t("invalid_amount", { defaultValue: "Please enter a valid amount." }));
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1200));
      toast.success(
        t("withdraw_success", {
          amount: `₹${amount}`,
          defaultValue: `₹${amount} withdrawn successfully`,
        })
      );
      onWithdraw?.(amount);
      onClose();
    } catch {
      toast.error(t("withdraw_failed", { defaultValue: "Withdrawal failed. Try again." }));
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        {/* Centering container */}
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          {/* Panel */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog.Panel className="inline-block w-full max-w-md transform overflow-hidden rounded-xl bg-[--color-bg] p-6 text-[--color-text] shadow-[var(--color-shadow)] transition-all dark:bg-[var(--color-bg)] dark:text-[var(--color-text-light)]">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <Dialog.Title as="h3" className="text-lg font-semibold">
                  {t("withdraw_funds", { defaultValue: "Withdraw Funds" })}
                </Dialog.Title>
                <button
                  onClick={onClose}
                  aria-label={t("close", { defaultValue: "Close" })}
                  className="text-[var(--color-text)] hover:text-[var(--color-text)]"
                >
                  <X />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4">
                <input
                  type="number"
                  aria-label={t("withdraw_amount", { defaultValue: "Enter amount" })}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t("enter_amount_placeholder", { defaultValue: "Enter amount in ₹" })}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:border-[var(--color-border)] dark:bg-[var(--color-bg)]"
                />
                <button
                  onClick={handleWithdraw}
                  disabled={loading}
                  className="w-full rounded-lg bg-primary py-2 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
                >
                  {loading
                    ? t("processing", { defaultValue: "Processing..." })
                    : t("withdraw_now", { defaultValue: "Withdraw Now" })}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  
  </>
);
}


// auto‑added by add-default-exports.js
export default WithdrawModal;
