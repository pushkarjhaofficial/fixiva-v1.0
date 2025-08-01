// src/components/cards/VendorEarningsCard.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from '@components';

export function VendorEarningsCard() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  const [earnings, setEarnings] = useState({
    today: 0,
    month: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    sendBotEvent('vendor_earnings_viewed');
    fetch('/api/vendor/earnings', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setEarnings({
          today: data.today || 0,
          month: data.month || 0,
          total: data.total || 0,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          t('earnings_fetch_error', {
            defaultValue: 'Failed to load earnings.',
          })
        );
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [sendBotEvent, t]);

  const helmetProps = {
    title: t('earnings_card_title', { defaultValue: 'Your Earnings' }),
    description: t('earnings_card_description', {
      defaultValue: 'Summary of your vendor earnings.',
    }),
    name: 'VendorEarningsCard',
  };

  if (loading) {
    return (
      <FixivaHelmet {...helmetProps}>
        <div className="rounded-lg border border-dashed p-6 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      </FixivaHelmet>
    );
  }

  if (error) {
    return (
      <FixivaHelmet {...helmetProps}>
        <div className="rounded-lg border border-red-500 bg-red-50 p-6 text-red-700">
          {t('earnings_card_error', {
            defaultValue: 'Unable to load earnings at this time.',
          })}
        </div>
      </FixivaHelmet>
    );
  }

  return (
    <FixivaHelmet {...helmetProps}>
      <div className="rounded-lg border p-6 bg-[--color-bg] shadow-md dark:bg-[--color-bg] border-[--color-border]">
        <h3 className="text-lg font-semibold text-[--color-text] mb-4">
          {t('earnings_card_title', { defaultValue: 'Your Earnings' })}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { key: 'today', label: t('earnings_today', { defaultValue: 'Today' }), value: earnings.today },
            { key: 'month', label: t('earnings_month', { defaultValue: 'This Month' }), value: earnings.month },
            { key: 'total', label: t('earnings_total', { defaultValue: 'Total' }), value: earnings.total },
          ].map(({ key, label, value }) => (
            <div key={key} className="flex flex-col items-center">
              <motion.span
                initial={{ count: 0 }}
                animate={{ count: value }}
                transition={{ duration: 1 }}
                className="text-2xl font-bold text-[--color-primary]"
              >
                {({ count }) => `₹${Math.floor(count).toLocaleString()}`}
              </motion.span>
              <span className="text-sm text-[--color-text-muted] mt-1" aria-label={`${label}: ₹${value}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </FixivaHelmet>
  );
}

export default React.memo(VendorEarningsCard);
