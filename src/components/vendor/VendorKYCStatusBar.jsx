// src/components/kyc/VendorKYCStatusBar.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from '@components';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const KYC_STEPS = [
  { key: 'idProof',    labelKey: 'kyc_step_id',    defaultLabel: 'ID Proof' },
  { key: 'addressProof', labelKey: 'kyc_step_address', defaultLabel: 'Address Proof' },
  { key: 'selfie',      labelKey: 'kyc_step_selfie', defaultLabel: 'Selfie Verification' },
];

export function VendorKYCStatusBar() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [status, setStatus]   = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  // Track view event and fetch KYC status
  useEffect(() => {
    sendBotEvent('vendor_kyc_status_viewed');
    fetch('/api/vendor/kyc/status', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setStatus(data))
      .catch(err => {
        console.error(err);
        toast.error(
          t('kyc_status_fetch_error', {
            defaultValue: 'Failed to load KYC status.',
          })
        );
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [sendBotEvent, t]);

  // Helmet metadata
  const helmetProps = {
    title: t('kyc_status_title', { defaultValue: 'KYC Status' }),
    description: t('kyc_status_description', {
      defaultValue: 'View your current KYC verification status.',
    }),
    name: 'VendorKYCStatusBar',
  };

  // Loading skeleton
  if (loading) {
    return (
      <FixivaHelmet {...helmetProps}>
        <div className="rounded border border-dashed p-4 animate-pulse" />
      </FixivaHelmet>
    );
  }

  // Error state
  if (error) {
    return (
      <FixivaHelmet {...helmetProps}>
        <div className="rounded border border-dashed p-4 text-red-500">
          {t('kyc_status_error', { defaultValue: 'Unable to load KYC status.' })}
        </div>
      </FixivaHelmet>
    );
  }

  // Determine overall completion
  const completedCount = KYC_STEPS.filter(step => status[step.key]).length;
  const percent = Math.round((completedCount / KYC_STEPS.length) * 100);

  return (
    <FixivaHelmet {...helmetProps}>
      <div className="space-y-4">
        {/* Progress Bar */}
        <div
          className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          aria-label={t('kyc_progress_percent', {
            defaultValue: '{{percent}}% complete',
            percent,
          })}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            className="h-full bg-[--color-primary]"
          />
        </div>

        {/* Step Indicators */}
        <ul className="flex justify-between">
          {KYC_STEPS.map(step => {
            const done = !!status[step.key];
            const Icon = done ? FiCheckCircle : FiAlertCircle;
            return (
              <li key={step.key} className="flex flex-col items-center text-center">
                <Icon
                  className={done ? 'text-[--color-primary]' : 'text-[--color-error]'}
                  size={24}
                  aria-hidden="true"
                />
                <span
                  className={
                    done
                      ? 'mt-1 text-sm text-[--color-text]'
                      : 'mt-1 text-sm text-[--color-text-muted]'
                  }
                >
                  {t(step.labelKey, { defaultValue: step.defaultLabel })}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </FixivaHelmet>
  );
}

export default React.memo(VendorKYCStatusBar);
