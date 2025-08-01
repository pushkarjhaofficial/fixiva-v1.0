import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

const KYCApprovalModal = ({
  show = false,
  onClose,
  onApprove,
  onReject,
  user = {},
}) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleApprove = () => {
    sendBotEvent("kyc_approved", { user });
    toast.success(t("kyc_approved_msg", { defaultValue: "KYC Approved!" }));
    onApprove?.(user);
    onClose?.();
  };

  const handleReject = () => {
    sendBotEvent("kyc_rejected", { user });
    toast.error(t("kyc_rejected_msg", { defaultValue: "KYC Rejected!" }));
    onReject?.(user);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-dark)]/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t("kyc_modal", { defaultValue: "KYC Approval Modal" })}
        >
          <FixivaHelmet
            title={t("kyc_approval_title", { defaultValue: "KYC Approval" })}
            description={t("kyc_approval_desc", { defaultValue: "Approve or reject user KYC requests." })}
            name="KYCApprovalModal"
          />
          <motion.div
            initial={{ scale: 0.95, y: 32, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 32, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="w-full max-w-md rounded-xl bg-[var(--color-bg)] p-8 shadow-xl"
          >
            <div className="mb-2 flex items-center gap-2 text-lg font-bold">
              {t("kyc_request_for", { defaultValue: "KYC Request for" })}{" "}
              <span className="text-[var(--color-primary)]">{user?.name || t("user", { defaultValue: "User" })}</span>
            </div>
            <p className="mb-4 text-sm text-[var(--color-text)]">
              {t("kyc_action_desc", {
                defaultValue:
                  "Please review the user's KYC documents and approve or reject their verification request.",
              })}
            </p>
            {/* Example: KYC document preview, add your file links/UI here */}
            {user?.kyc_docs && (
              <div className="mb-4 rounded bg-[var(--color-bg-muted)] p-3">
                <strong>{t("documents", { defaultValue: "Documents" })}:</strong>
                <ul className="mt-2 list-disc pl-4 text-xs">
                  {user.kyc_docs.map((doc, i) => (
                    <li key={i}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[var(--color-accent)]"
                      >
                        {doc.label || `${t("doc", { defaultValue: "Document" })} ${i + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleReject}
                aria-label={t("reject_kyc", { defaultValue: "Reject KYC" })}
                className="flex items-center gap-2 rounded bg-[var(--color-danger)] px-4 py-2 text-sm text-white hover:bg-[var(--color-danger-dark)]"
                type="button"
              >
                <FaTimesCircle /> {t("reject", { defaultValue: "Reject" })}
              </button>
              <button
                onClick={handleApprove}
                aria-label={t("approve_kyc", { defaultValue: "Approve KYC" })}
                className="flex items-center gap-2 rounded bg-[var(--color-success)] px-4 py-2 text-sm text-white hover:bg-[var(--color-success-dark)]"
                type="button"
              >
                <FaCheckCircle /> {t("approve", { defaultValue: "Approve" })}
              </button>
            </div>
            <button
              onClick={onClose}
              aria-label={t("close_modal", { defaultValue: "Close Modal" })}
              className="absolute right-6 top-6 text-2xl text-[var(--color-text)] hover:text-[var(--color-accent)]"
              type="button"
            >
              <span aria-hidden>×</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};export default KYCApprovalModal;