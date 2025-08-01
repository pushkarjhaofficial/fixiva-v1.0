import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mic } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";

export function BookingVoiceInput({ onTranscript = () => {}, lang = "en-IN" }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error(t("voice_input.unsupported", { defaultValue: "Voice input not supported in this browser." }));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      if (transcript) {
        onTranscript(transcript);
        toast.success(t("voice_input.success", { defaultValue: "Voice input captured!" }));
        sendBotEvent("voice_input_success");
      }
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
  }, [lang, onTranscript, sendBotEvent, t]);

  const handleClick = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      toast.error(t("voice_input.unsupported", { defaultValue: "Voice input not supported in this browser." }));
    }
  };

  return (
    <>
      <FixivaHelmet
        title={t("voice_input.title", { defaultValue: "Voice Input" })}
        description={t("voice_input.description", { defaultValue: "Use your voice to fill input fields quickly." })}
        name="BookingVoiceInput"
      />
      <motion.button
        type="button"
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        disabled={listening}
        aria-label={t("voice_input.button", { defaultValue: "Start Voice Input" })}
        className={`flex items-center gap-2 px-4 py-2 rounded border border-[var(--color-border)] text-[var(--color-text)] bg-[--color-surface] hover:bg-[--color-bg] transition ${
          listening ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <Mic className="w-5 h-5" />
        {listening
          ? t("voice_input.listening", { defaultValue: "Listening..." })
          : t("voice_input.button", { defaultValue: "Voice Input" })}
      </motion.button>
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingVoiceInput;
