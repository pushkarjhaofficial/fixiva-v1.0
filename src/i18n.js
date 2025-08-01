import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Fixiva",
      dashboard: "Dashboard",
      bookings: "My Bookings",
      profile: "Profile",
      logout: "Logout",
    },
  },
  hi: {
    translation: {
      welcome: "फिक्सीवा में आपका स्वागत है",
      dashboard: "डैशबोर्ड",
      bookings: "मेरी बुकिंग्स",
      profile: "प्रोफ़ाइल",
      logout: "लॉगआउट",
    },
  },
  /* ✅ Add more language files here */
};

i18n
  .use(LanguageDetector) // ✅ Detect browser language
  .use(initReactI18next) // ✅ Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "cookie"],
      caches: ["localStorage"],
    },
  });

export default  i18n;
