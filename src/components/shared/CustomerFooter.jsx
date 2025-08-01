import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaArrowUp, FaQrcode,
} from "react-icons/fa6";
import { QRCodeCanvas } from "qrcode.react";
import confetti from "canvas-confetti";
import { useFixivaBot } from "@/hooks/context/useFixivaBot";

export function CustomerFooter() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof window !== "undefined" ? navigator.onLine : true);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("online", () => setIsOnline(true));
      window.removeEventListener("offline", () => setIsOnline(false));
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
    toast.success(t("footer_subscribed", { defaultValue: "Subscribed!" }));
  };

  return (
    <>
      <footer className="relative mt-20 bg-[--color-footer] pb-6 pt-10 text-[--color-text-light]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 text-sm sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-2 text-lg font-bold text-[--color-text-light]">FIXIVA</h3>
            <p className="text-muted font-light leading-snug max-w-sm">
              {t("footer_tagline", { defaultValue: "Bringing expert repairs to your doorstep — reliable, affordable, and fast." })}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">{t("footer_quick_links", { defaultValue: "Quick Links" })}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-footer-link-hover" style={{ color: "var(--footer-link)" }}>{t("footer_home", { defaultValue: "Home" })}</Link></li>
              <li><Link to="/customer/bookings" className="hover:text-footer-link-hover" style={{ color: "var(--footer-link)" }}>{t("footer_my_bookings", { defaultValue: "My Bookings" })}</Link></li>
              <li><Link to="/customer/profile" className="hover:text-footer-link-hover" style={{ color: "var(--footer-link)" }}>{t("footer_my_profile", { defaultValue: "My Profile" })}</Link></li>
              <li><Link to="/customer/wallet" className="hover:text-footer-link-hover" style={{ color: "var(--footer-link)" }}>{t("footer_wallet", { defaultValue: "Wallet" })}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">{t("footer_legal", { defaultValue: "Legal" })}</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-footer-link-hover" style={{ color: "var(--footer-link)" }}>{t("footer_terms", { defaultValue: "Terms of Service" })}</Link></li>
              <li><Link to="/privacy" className="hover:text-footer-link-hover" style={{ color: "var(--footer-link)" }}>{t("footer_privacy", { defaultValue: "Privacy Policy" })}</Link></li>
              <li><Link to="/contact" className="hover:text-footer-link-hover" style={{ color: "var(--footer-link)" }}>{t("footer_contact", { defaultValue: "Contact Us" })}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">{t("footer_newsletter", { defaultValue: "Newsletter" })}</h4>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer_email_placeholder", { defaultValue: "Enter your email" })}
                className="w-full px-4 py-2 rounded-md bg-input text-sm border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-[--color-text-light] font-semibold px-4 py-2 rounded-md text-sm"
              >
                {t("footer_subscribe_btn", { defaultValue: "Subscribe" })}
              </button>
              {subscribed && (
                <div className="text-[var(--color-text)] text-xs animate-pulse">
                  🎉 {t("footer_thank_you_subscribe", { defaultValue: "Thank you for subscribing!" })}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Social/QR/Online Status */}
        <div className="absolute top-5 right-6 flex items-center gap-4 text-xl text-muted">
          <span className={`px-2 py-1 rounded ${isOnline ? "bg-[var(--color-bg)] text-[var(--color-text)]" : "bg-[var(--color-bg)] text-[var(--color-text)]"} text-xs font-medium`}>
            {isOnline ? t("footer_online", { defaultValue: "Online" }) : t("footer_offline", { defaultValue: "Offline" })}
          </span>
          <button aria-label={t("footer_share_app", { defaultValue: "Share App" })} onClick={() => setShowQRModal(true)} title={t("footer_share_app", { defaultValue: "Share App" })} className="hover:text-footer-link-hover transition"><FaQrcode /></button>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)]"><FaFacebookF /></a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400"><FaXTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)]"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)]"><FaLinkedinIn /></a>
        </div>

        {/* QR Modal */}
        {showQRModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[--color-bg-dark]/60 p-4">
            <div className="bg-[var(--color-bg)] p-6 rounded-lg text-center shadow-[var(--color-shadow)]">
              <h3 className="text-lg font-semibold mb-4">{t("footer_scan_install", { defaultValue: "Scan to Install App" })}</h3>
              <QRCodeCanvas value={window.location.href} size={160} />
              <div className="mt-4">
                <button onClick={() => setShowQRModal(false)} className="px-4 py-2 bg-muted text-text rounded-md hover:bg-muted/80">
                  {t("footer_close", { defaultValue: "Close" })}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary hover:bg-primary-hover text-[--color-text-light] shadow-[var(--color-shadow)] transition transform hover:scale-110 animate-bounce"
            title={t("footer_back_to_top", { defaultValue: "Back to top" })}
          >
            <FaArrowUp />
          </button>
        )}

        <div className="text-xs text-center mt-12 border-t border-border pt-6 text-muted">
          © {new Date().getFullYear()} Fixiva Technologies Pvt. Ltd. {t("footer_all_rights", { defaultValue: "All rights reserved." })}
        </div>
      </footer>
    </>
  );
}


// auto‑added by add-default-exports.js
export default CustomerFooter;
