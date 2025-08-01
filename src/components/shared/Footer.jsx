import React from "react";
import { useTranslation } from "react-i18next";
import FixivaHelmet from "@/components";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <FixivaHelmet
        title={t("footer_title", { defaultValue: "Fixiva Footer" })}
        description={t("footer_desc", { defaultValue: "Fixiva platform footer section with contact and legal info." })}
        name="Footer"
      />
      <footer className="mt-20 bg-[var(--color-footer,#1c1f2b)] pb-6 pt-10 text-[var(--color-text-light)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 text-sm sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-2 text-lg font-bold text-[var(--color-text-light)]">FIXIVA</h3>
            <p className="text-[var(--color-text)]">
              {t("footer_tagline", {
                defaultValue: "Your trusted repair & maintenance platform. Fast, reliable, and professional service providers near you.",
              })}
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">{t("company", { defaultValue: "Company" })}</h4>
            <ul className="space-y-1 text-[var(--color-text)]">
              <li>
                <Link to="/about" className="hover:underline">
                  {t("about_us", { defaultValue: "About Us" })}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  {t("contact", { defaultValue: "Contact" })}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">
                  {t("faqs", { defaultValue: "FAQs" })}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">{t("legal", { defaultValue: "Legal" })}</h4>
            <ul className="space-y-1 text-[var(--color-text)]">
              <li>
                <Link to="/terms" className="hover:underline">
                  {t("terms_and_conditions", { defaultValue: "Terms & Conditions" })}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  {t("privacy_policy", { defaultValue: "Privacy Policy" })}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">{t("connect", { defaultValue: "Connect" })}</h4>
            <p className="text-[var(--color-text)]">support@fixiva.in</p>
            <p className="text-[var(--color-text)]">+91 98765 43210</p>
            {/* Add social icons/newsletter/QR/modal here if needed */}
          </div>
        </div>
        <div className="mt-8 border-t border-[var(--color-border)] pt-4 text-center text-xs text-[var(--color-text)]">
          © {currentYear} FIXIVA. {t("all_rights_reserved", { defaultValue: "All rights reserved." })}
        </div>
      </footer>
    </>
  );
};export default Footer;