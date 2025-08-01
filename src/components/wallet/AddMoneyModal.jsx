// src/components/modals/AddMoneyModal.jsx
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useFixivaBot } from "@/hooks";
import { BookingVoiceInput, QRScanner } from '@components';

const AddMoneyModal = ({ isOpen, onClose, onSuccess }) => {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [amount, setAmount]   = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode]       = useState('manual'); // 'manual' | 'voice' | 'qr'

  // Track modal opens
  useEffect(() => {
    if (isOpen) sendBotEvent('add_money_modal_opened');
  }, [isOpen, sendBotEvent]);

  const handleAddMoney = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error(t('add_money_invalid_amount', { defaultValue: 'Enter a valid amount' }));
      return;
    }
    setLoading(true);
    sendBotEvent('add_money_initiated', { amount });
    try {
      // 👇 Replace with your real API call
      const res = await fetch('/api/wallet/add', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      await res.json();
      toast.success(
        t('add_money_success', { defaultValue: `₹${amount} added to your wallet` })
      );
      sendBotEvent('add_money_success', { amount });
      onSuccess?.(Number(amount));
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(t('add_money_failed', { defaultValue: 'Something went wrong' }));
      sendBotEvent('add_money_failed', { error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceResult = (text) => {
    const num = text.replace(/[^\d.]/g, '');
    setAmount(num);
    sendBotEvent('add_money_voice_input', { value: num });
    setMode('manual');
  };

  const handleQRScan = (code) => {
    try {
      const url = new URL(code);
      const amt = url.searchParams.get('amount') || '';
      setAmount(amt);
      sendBotEvent('add_money_qr_scanned', { value: amt });
    } catch {
      toast.error(t('add_money_qr_error', { defaultValue: 'Invalid QR code' }));
      sendBotEvent('add_money_qr_failed');
    }
    setMode('manual');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} as={React.Fragment}>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <Dialog.Overlay
            forceMount
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-md rounded-xl bg-[--color-bg] p-6 shadow-lg dark:bg-[--color-bg]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-money-title"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3
                    id="add-money-title"
                    className="text-lg font-semibold text-[--color-text] dark:text-[--color-text-light]"
                  >
                    {t('add_money_title', { defaultValue: 'Add Money to Wallet' })}
                  </h3>
                  <button
                    onClick={onClose}
                    aria-label={t('close', { defaultValue: 'Close modal' })}
                    className="text-[--color-text] hover:text-[--color-text-accent]"
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>

                {/* Input Mode Tabs */}
                <div className="flex gap-2 mb-4">
                  {['manual', 'voice', 'qr'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      disabled={mode === m}
                      className={`
                        flex-1 px-3 py-1 rounded-lg text-sm font-medium
                        ${
                          mode === m
                            ? 'bg-[--color-primary] text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                        }
                        ${mode !== m && 'hover:bg-gray-200 dark:hover:bg-gray-600'}
                      `}
                    >
                      {t(`add_money_mode_${m}`, {
                        defaultValue:
                          m === 'manual'
                            ? 'Manual'
                            : m === 'voice'
                            ? 'Voice'
                            : 'Scan',
                      })}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                {mode === 'voice' ? (
                  <BookingVoiceInput onResult={handleVoiceResult} />
                ) : mode === 'qr' ? (
                  <QRScanner onScan={handleQRScan} />
                ) : (
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={t('enter_amount_placeholder', {
                      defaultValue: 'Enter amount (₹)',
                    })}
                    className="
                      w-full rounded-lg border border-gray-300 bg-[--color-bg]
                      px-4 py-2 text-[--color-text] outline-none
                      focus:ring-2 focus:ring-[--color-focus-ring]
                      dark:bg-[--color-bg] dark:text-[--color-text-light]
                    "
                    aria-label={t('enter_amount', { defaultValue: 'Amount input' })}
                  />
                )}

                {/* Submit */}
                <button
                  onClick={handleAddMoney}
                  disabled={loading}
                  className="
                    w-full mt-6 rounded-lg bg-[--color-primary] py-2 font-bold
                    text-[--color-text-light] transition
                    hover:bg-[--color-hover] disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {loading
                    ? t('adding', { defaultValue: 'Adding...' })
                    : t('add_money_button', { defaultValue: 'Add Money' })}
                </button>
              </motion.div>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default React.memo(AddMoneyModal);
