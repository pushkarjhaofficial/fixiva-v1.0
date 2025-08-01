// src/components/status/AutoAssignVendorStatus.jsx
import React, { useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RetryButton } from "@/Shared";
import { BookingVoiceInput, QRScanner, FixivaHelmet } from '@components';
import { useFixivaBot } from "@/hooks";

function AutoAssignVendorStatus() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  // Track view
  useEffect(() => {
    sendBotEvent('auto_assign_vendor_status_viewed');
  }, [sendBotEvent]);

  // Retry action
  const handleRetry = useCallback(() => {
    sendBotEvent('auto_assign_vendor_retry_clicked');
    toast.success(
      t('auto_assign_vendor_retry_success', { defaultValue: 'Retry successful' })
    );
  }, [sendBotEvent, t]);

  // Voice input handler
  const handleVoiceResult = useCallback(
    (text) => {
      sendBotEvent('auto_assign_vendor_voice_input', { text });
      toast.success(
        t('auto_assign_vendor_voice_success', { defaultValue: 'Voice input received' })
      );
    },
    [sendBotEvent, t]
  );

  // QR scan handler
  const handleQRScan = useCallback(
    (code) => {
      sendBotEvent('auto_assign_vendor_qr_scanned', { code });
      toast.success(
        t('auto_assign_vendor_qr_success', { defaultValue: 'QR code scanned' })
      );
    },
    [sendBotEvent, t]
  );

  return (
    <FixivaHelmet
      title={t('auto_assign_vendor_status_title', {
        defaultValue: 'Auto Assign Vendor Status',
      })}
      description={t('auto_assign_vendor_status_description', {
        defaultValue:
          'Automatically assign the best vendor to incoming bookings.',
      })}
      name="AutoAssignVendorStatus"
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="
            p-6 bg-[--color-bg] border border-[--color-border]
            rounded-lg shadow-md text-[--color-text]
          "
          role="region"
          aria-labelledby="auto-assign-status-title"
        >
          <h2
            id="auto-assign-status-title"
            className="mb-2 text-lg font-bold"
          >
            {t('auto_assign_vendor_status_title', {
              defaultValue: 'Auto Assign Vendor Status',
            })}
          </h2>
          <p className="text-sm text-[--color-text-muted]">
            {t('auto_assign_vendor_status_description', {
              defaultValue:
                'Automatically assign the best vendor to incoming bookings.',
            })}
          </p>

          <div className="mt-4 flex gap-4">
            <RetryButton onClick={handleRetry} />
            <BookingVoiceInput onResult={handleVoiceResult} />
            <QRScanner onScan={handleQRScan} />
          </div>
        </motion.div>
      </AnimatePresence>
    </FixivaHelmet>
  );
}

export default React.memo(AutoAssignVendorStatus);
