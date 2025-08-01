import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaMicrophone, FaTimes, FaCheck, FaRedo } from "react-icons/fa";
import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";
import { BookingVoiceInput } from "@/components/booking";
import { QRScanner } from "@/components/booking";
import FixivaHelmet from "@/components";

/**
 * VoiceSearchInput – Premium voice-enabled search/input bar with i18n, accessibility, AI triggers, retry, and advanced UX.
 */
export default function VoiceSearchInput({ onResult, placeholder, className = "" }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { sendBotEvent } = useFixivaBot();
  const [listening, setListening] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  // Setup for SSR-safe window SpeechRecognition
  const getSpeechRecognition = () => {
    if (typeof window === "undefined") return null;
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  };

  const handleVoice = () => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setError(t("voice_not_supported", { defaultValue: "Voice search is not supported in this browser." }));
      toast.error(t("voice_not_supported"));
      return;
    }
    setListening(true);
    setTranscript("");
    setError("");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setQuery(text);
      if (onResult) onResult(text);
      sendBotEvent("voice_search", { text });
      setListening(false);
      setLoading(false);
    };
    recognition.onerror = (event) => {
      setError(event.error || t("voice_error", { defaultValue: "Could not process voice." }));
      setListening(false);
      setLoading(false);
      toast.error(event.error || "Voice search failed.");
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setLoading(true);
  };

  const handleCancel = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    setListening(false);
    setLoading(false);
    setError("");
  };

  const handleRetry = () => {
    setError("");
    handleVoice();
  };

  // Accessibility: focus input on mount
  const inputRef = useRef(null);

  return (
    <>
      <FixivaHelmet
        title={t("voice_search_title", { defaultValue: "Voice Search" })}
        description={t("voice_search_desc", { defaultValue: "Search using your voice for a seamless experience." })}
        name="VoiceSearchInput"
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        className={`relative flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-4 py-3 shadow ${className}`}
        role="search"
        aria-label={t("voice_search", { defaultValue: "Voice Search Input" })}
      >
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent outline-none text-base text-[var(--color-text)] placeholder-[var(--color-text-light)]"
          placeholder={placeholder || t("search_speak_now", { defaultValue: "Search or speak now..." })}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading || listening}
          aria-label={t("voice_search_input", { defaultValue: "Voice search input" })}
        />

        {/* Voice Trigger Button */}
        <button
          onClick={handleVoice}
          disabled={loading || listening}
          aria-label={t("start_voice_search", { defaultValue: "Start voice search" })}
          className={`ml-2 transition-colors rounded-full p-2 border ${listening ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-bg)]"} hover:bg-[var(--color-accent-light)]`}
        >
          <FaMicrophone size={22} className={listening ? "animate-pulse" : ""} />
        </button>

        {/* Cancel / Retry */}
        <AnimatePresence>
          {(listening || loading) && (
            <motion.button
              key="cancel"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              onClick={handleCancel}
              aria-label={t("cancel_voice", { defaultValue: "Cancel voice search" })}
              className="ml-2 rounded-full p-2 bg-[var(--color-bg)] text-[var(--color-danger)] border hover:bg-[var(--color-danger-light)]"
            >
              <FaTimes size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Retry button if error */}
        {error && (
          <button
            onClick={handleRetry}
            aria-label={t("retry_voice", { defaultValue: "Retry voice search" })}
            className="ml-2 rounded-full p-2 bg-[var(--color-warning)] text-white border hover:bg-[var(--color-warning-dark)]"
          >
            <FaRedo size={18} />
          </button>
        )}

        {/* Status icons */}
        {!loading && !error && transcript && (
          <span className="ml-2 text-green-600" aria-label={t("voice_success", { defaultValue: "Voice input successful" })}>
            <FaCheck />
          </span>
        )}
      </motion.div>

      {/* Error / Transcript below */}
      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="mt-2 text-sm text-[var(--color-danger)]"
            role="alert"
          >
            {error}
          </motion.div>
        )}
        {!error && transcript && (
          <motion.div
            key="transcript"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="mt-2 text-xs text-[var(--color-success)]"
            aria-live="polite"
          >
            {t("you_said", { defaultValue: "You said:" })} {transcript}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
