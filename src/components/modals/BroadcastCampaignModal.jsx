import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

const BroadcastCampaignModal = ({
  open = false,
  onClose,
  onSend,
}) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error(t("please_enter_message", { defaultValue: "Please enter a message." }));
      return;
    }
    setLoading(true);
    try {
      // Call backend or provided onSend
      await onSend?.(message);
      sendBotEvent("broadcast_campaign_sent", { message });
      toast.success(t("broadcast_sent_success", { defaultValue: "Broadcast sent successfully!" }));
      setMessage("");
      onClose?.();
    } catch (err) {
      toast.error(t("broadcast_send_failed", { defaultValue: "Failed to send broadcast." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FixivaHelmet
        title={t("broadcast_campaign_title", { defaultValue: "Broadcast Campaign" })}
        description={t("broadcast_campaign_desc", { defaultValue: "Send a broadcast message to all users." })}
        name="BroadcastCampaignModal"
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-dark)]/40 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={t("broadcast_campaign_modal", { defaultValue: "Broadcast Campaign Modal" })}
          >
            <motion.div
              initial={{ scale: 0.96, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="w-full max-w-md rounded-xl bg-[var(--color-bg)] p-7 shadow-xl relative"
            >
              {/* Title */}
              <h2 className="mb-2 text-lg font-bold">
                {t("broadcast_campaign", { defaultValue: "Broadcast Campaign" })}
              </h2>
              <p className="mb-4 text-sm text-[var(--color-text)]">
                {t("broadcast_campaign_desc", { defaultValue: "Send a message to all users instantly." })}
              </p>
              {/* Textarea */}
              <textarea
                className="mb-4 w-full h-24 resize-none rounded border border-[var(--color-border)] p-2 text-sm bg-[var(--color-bg)] text-[var(--color-text)]"
                placeholder={t("broadcast_message_placeholder", { defaultValue: "Type your broadcast message..." })}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                aria-label={t("broadcast_message", { defaultValue: "Broadcast message" })}
              />
              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="rounded bg-[var(--color-bg-muted)] px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg)]"
                  type="button"
                  disabled={loading}
                  aria-label={t("cancel", { defaultValue: "Cancel" })}
                >
                  {t("cancel", { defaultValue: "Cancel" })}
                </button>
                <button
                  onClick={handleSend}
                  className="rounded bg-[var(--color-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--color-accent)]"
                  type="button"
                  disabled={loading}
                  aria-label={t("send_broadcast", { defaultValue: "Send Broadcast" })}
                >
                  {loading
                    ? t("sending", { defaultValue: "Sending..." })
                    : t("send", { defaultValue: "Send" })}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};export default BroadcastCampaignModal;