// src/components/footer/VendorFooter.jsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from '@components';

function VendorFooter() {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();
  const currentYear = new Date().getFullYear();

  // Track that the footer was rendered
  useEffect(() => {
    sendBotEvent('vendor_footer_viewed');
  }, [sendBotEvent]);

  return (
    <FixivaHelmet
      title={t('vendor_footer_title', { defaultValue: 'Vendor Panel Footer' })}
      description={t('vendor_footer_description', {
        defaultValue: 'Footer for the Fixiva vendor panel',
      })}
      name="VendorFooter"
    >
      <footer
        role="contentinfo"
        className="mt-10 bg-[--color-bg] py-6 text-[--color-text-light] border-t border-[--color-border]"
      >
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between px-4 text-sm text-[--color-text] sm:flex-row">
          <p>
            &copy; {currentYear}{' '}
            {t('vendor_footer_copyright', {
              defaultValue: 'Fixiva Vendor Panel. All rights reserved.',
            })}
          </p>
          <p>
            {t('vendor_footer_help_prompt', { defaultValue: 'Need help?' })}{' '}
            <a
              href="mailto:support@fixiva.in"
              aria-label={t('vendor_footer_contact_email', {
                defaultValue: 'Email support at support@fixiva.in',
              })}
              className="text-[--color-primary] hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              support@fixiva.in
            </a>
          </p>
        </div>
      </footer>
    </FixivaHelmet>
  );
}

export default React.memo(VendorFooter);
