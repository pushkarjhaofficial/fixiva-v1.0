// src/components/transaction/TransactionHistoryTable.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useFixivaBot } from "@/hooks";

const TransactionHistoryTable = () => {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  // Fetch transaction history on mount
  useEffect(() => {
    fetch('/api/transactions', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setTransactions(data);
        sendBotEvent('transaction_history_loaded', { count: data.length });
      })
      .catch(err => {
        console.error(err);
        toast.error(t('transactions_fetch_error', {
          defaultValue: 'Failed to load transactions.'
        }));
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [sendBotEvent, t]);

  const handleRefresh = () => {
    setLoading(true);
    sendBotEvent('transaction_history_refresh');
    // simple re-fetch
    fetch('/api/transactions', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setTransactions(data))
      .catch(err => {
        console.error(err);
        toast.error(t('transactions_fetch_error', {
          defaultValue: 'Failed to load transactions.'
        }));
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* SEO & accessibility */}
      <Helmet>
        <title>
          {t('transaction_history_title', {
            defaultValue: 'Transaction History'
          })}
        </title>
        <meta
          name="description"
          content={t('transaction_history_description', {
            defaultValue: 'View your past transactions.'
          })}
        />
      </Helmet>

      {/* Header with refresh */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {t('transaction_history_title', {
            defaultValue: 'Transaction History'
          })}
        </h2>
        <button
          onClick={handleRefresh}
          className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label={t('refresh', { defaultValue: 'Refresh' })}
        >
          {t('refresh', { defaultValue: 'Refresh' })}
        </button>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2">
                {t('date', { defaultValue: 'Date' })}
              </th>
              <th className="px-4 py-2">
                {t('transaction_id', { defaultValue: 'Transaction ID' })}
              </th>
              <th className="px-4 py-2">
                {t('amount', { defaultValue: 'Amount' })}
              </th>
              <th className="px-4 py-2">
                {t('type', { defaultValue: 'Type' })}
              </th>
              <th className="px-4 py-2">
                {t('status', { defaultValue: 'Status' })}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // skeleton rows
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  {Array.from({ length: 5 }).map((__, colIdx) => (
                    <td key={colIdx} className="px-4 py-2">
                      <motion.div
                        className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : error ? (
              // error state
              <tr>
                <td
                  className="px-4 py-2 text-red-500"
                  colSpan="5"
                >
                  {t('transactions_fetch_error', {
                    defaultValue: 'Failed to load transactions.'
                  })}
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              // empty state
              <tr>
                <td
                  className="px-4 py-2 text-center"
                  colSpan="5"
                >
                  {t('no_transactions', {
                    defaultValue: 'No transactions to display.'
                  })}
                </td>
              </tr>
            ) : (
              // data rows
              transactions.map(tx => (
                <tr
                  key={tx.id}
                  className="even:bg-gray-50 dark:even:bg-gray-900"
                >
                  <td className="px-4 py-2">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{tx.id}</td>
                  <td className="px-4 py-2">{tx.amount}</td>
                  <td className="px-4 py-2">
                    {t(tx.type, { defaultValue: tx.type })}
                  </td>
                  <td className="px-4 py-2">
                    {t(tx.status, { defaultValue: tx.status })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default React.memo(TransactionHistoryTable);
