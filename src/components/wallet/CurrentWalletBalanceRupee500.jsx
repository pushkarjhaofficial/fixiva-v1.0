// src/components/wallet/CurrentWalletBalance500.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTheme } from '@context';
import { useFixivaBot } from "@/hooks";

const CurrentWalletBalance500 = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { triggerBot } = useFixivaBot();

  const label = t('currentwalletbalancerupee500', { defaultValue: '₹500 Wallet Balance' });
  const tooltip = t('currentwalletbalancerupee500_tooltip', { defaultValue: 'Click to use ₹500 from wallet' });
  const successMsg = t('currentwalletbalancerupee500_success', { defaultValue: '₹500 wallet applied' });

  const handleClick = () => {
    if (disabled) return;
    onClick();
    toast.success(successMsg);
    triggerBot('wallet_balance_clicked', { defaultValue: 'wallet_balance_clicked' });
    window.gtag?.('event', 'wallet_balance_used', { method: '₹500' });
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className={`
              inline-flex items-center px-4 py-2 rounded-md border transition
              ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 text-gray-100'
                  : 'border-gray-200 bg-white text-gray-900'
              }
              ${
                disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              }
            `}
            aria-label={label}
          >
            <FiCheckCircle className="mr-2 text-lg" aria-hidden="true" />
            {label}
          </motion.button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={8}
          align="center"
          className="
            rounded-md border border-[--color-border]
            bg-[--color-foreground] px-3 py-2 text-sm
            text-[--color-text-light] shadow-md
          "
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default React.memo(CurrentWalletBalance500);
