// src/components/cards/AutoVendorSuggestionCard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from '@components';
import { FiRefreshCw, FiArrowRightCircle } from 'react-icons/fi';

export function AutoVendorSuggestionCard() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/vendor/suggestions', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setSuggestions(data);
      sendBotEvent('auto_suggestions_loaded', { count: data.length });
    } catch (err) {
      console.error(err);
      toast.error(
        t('suggestions_fetch_error', {
          defaultValue: 'Failed to load suggestions.',
        })
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [sendBotEvent, t]);

  useEffect(() => {
    sendBotEvent('auto_suggestions_viewed');
    fetchSuggestions();
  }, [fetchSuggestions, sendBotEvent]);

  const handleRefresh = () => {
    sendBotEvent('auto_suggestions_refreshed');
    fetchSuggestions();
  };

  const helmetProps = {
    title: t('auto_suggestion_title', { defaultValue: 'Recommended Actions' }),
    description: t('auto_suggestion_description', {
      defaultValue: 'Get automated suggestions to improve your shop performance.',
    }),
    name: 'AutoVendorSuggestionCard',
  };

  return (
    <FixivaHelmet {...helmetProps}>
      <div className="relative rounded-lg border border-[--color-border] bg-[--color-bg] p-6 shadow dark:bg-[--color-bg]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[--color-text]">
            {helmetProps.title}
          </h3>
          <button
            onClick={handleRefresh}
            disabled={loading}
            aria-label={t('refresh_suggestions', { defaultValue: 'Refresh suggestions' })}
            className="p-1 rounded hover:bg-[--color-surface-hover] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FiRefreshCw size={20} />
          </button>
        </div>

        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                />
              ))}
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500"
            >
              {t('suggestions_fetch_error', {
                defaultValue: 'Unable to fetch suggestions.',
              })}
            </motion.div>
          ) : suggestions.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-[--color-text-muted]"
            >
              {t('no_suggestions', { defaultValue: 'No suggestions at this time.' })}
            </motion.div>
          ) : (
            <motion.ul
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="font-medium text-[--color-text]">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="mt-1 text-sm text-[--color-text-muted]">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.link && (
                    <Link
                      to={item.link}
                      onClick={() =>
                        sendBotEvent('auto_suggestion_clicked', {
                          id: item.id,
                        })
                      }
                      aria-label={t('view_details', { defaultValue: 'View details' })}
                      className="text-[--color-primary] hover:text-[--color-hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <FiArrowRightCircle size={24} />
                    </Link>
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </FixivaHelmet>
  );
}

export default React.memo(AutoVendorSuggestionCard);
