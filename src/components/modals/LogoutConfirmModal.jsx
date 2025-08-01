// src/components/modals/LogoutConfirmModal.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/hooks";            // adjust path as needed
import { Helmet } from 'react-helmet-async';

const LogoutConfirmModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    // immediate redirect (no toast, page shows its own message)
    navigate('/customer/settings/logout-success', { replace: true });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      {/* update document title when open */}
      <Helmet>
        {open && (
          <title>
            {t('logout_confirm_page_title', { defaultValue: 'Confirm Logout' })}
          </title>
        )}
      </Helmet>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />

            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-dialog-title"
              >
                <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <Dialog.Title
                    id="logout-dialog-title"
                    className="flex items-center gap-2 text-xl font-semibold text-red-600"
                  >
                    <FaSignOutAlt aria-hidden="true" />
                    {t('logout_confirm_title', { defaultValue: 'Confirm Logout' })}
                  </Dialog.Title>

                  <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {t(
                      'logout_confirm_description',
                      {
                        defaultValue:
                          'Are you sure you want to logout? This will end your session.',
                      }
                    )}
                  </Dialog.Description>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {t('cancel', { defaultValue: 'Cancel' })}
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      {t('logout', { defaultValue: 'Logout' })}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default React.memo(LogoutConfirmModal);
