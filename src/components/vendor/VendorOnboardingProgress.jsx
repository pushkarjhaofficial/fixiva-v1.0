// src/components/onboarding/VendorOnboardingProgress.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from '@components';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';

const STEPS = [
  { key: 'personal', labelKey: 'onboarding_step_personal', defaultLabel: 'Personal Info' },
  { key: 'business', labelKey: 'onboarding_step_business', defaultLabel: 'Business Info' },
  { key: 'kyc',      labelKey: 'onboarding_step_kyc',      defaultLabel: 'KYC Documents' },
  { key: 'bank',     labelKey: 'onboarding_step_bank',     defaultLabel: 'Bank Details' },
  { key: 'complete', labelKey: 'onboarding_step_complete', defaultLabel: 'Complete' },
];

export function VendorOnboardingProgress() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [status, setStatus]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  // on mount: track and fetch status
  useEffect(() => {
    sendBotEvent('vendor_onboarding_progress_viewed');
    fetch('/api/vendor/onboarding/status', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setStatus(data))
      .catch(err => {
        console.error(err);
        toast.error(
          t('onboarding_status_fetch_error', {
            defaultValue: 'Could not load onboarding status',
          })
        );
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [sendBotEvent, t]);

  // compute progress
  const completedCount = status
    ? STEPS.filter(step => status[step.key]).length
    : 0;
  const percentComplete = Math.round((completedCount / STEPS.length) * 100);

  // common Helmet props
  const helmetProps = {
    title: t('onboarding_progress_title', { defaultValue: 'Onboarding Progress' }),
    description: t('onboarding_progress_description', {
      defaultValue: 'Track your vendor onboarding steps',
    }),
    name: 'VendorOnboardingProgress',
  };

  if (loading) {
    return (
      <FixivaHelmet {...helmetProps}>
        <div className="rounded border border-dashed p-4 animate-pulse" />
      </FixivaHelmet>
    );
  }

  if (error) {
    return (
      <FixivaHelmet {...helmetProps}>
        <div className="rounded border border-dashed p-4 text-red-500">
          {t('onboarding_status_load_error', {
            defaultValue: 'Error loading onboarding status.',
          })}
        </div>
      </FixivaHelmet>
    );
  }

  return (
    <FixivaHelmet {...helmetProps}>
      <div className="space-y-6">
        {/* Progress Bar */}
        <div
          className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          aria-label={t('progress_percent', {
            defaultValue: '{{percent}}% complete',
            percent: percentComplete,
          })}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentComplete}%` }}
            className="h-full bg-[--color-primary]"
          />
        </div>

        {/* Steps List */}
        <ul className="space-y-4">
          {STEPS.map(step => {
            const done = status[step.key];
            return (
              <li key={step.key} className="flex items-center gap-3">
                {done ? (
                  <FiCheckCircle
                    className="text-[--color-primary] flex-shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <FiCircle
                    className="text-gray-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={
                    done
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-500 dark:text-gray-400'
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

export default React.memo(VendorOnboardingProgress);
