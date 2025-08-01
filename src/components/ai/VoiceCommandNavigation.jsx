import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaStop, FaVolumeUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FixivaHelmet from "@/components";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const commandsMap = {
  "go to dashboard": "/customer/dashboard",
  "open wallet": "/customer/wallet",
  "my bookings": "/customer/bookings",
  "new booking": "/customer/booking",
  profile: "/customer/profile",
  offers: "/customer/offers",
  "open support": "/customer/support",
  "open notifications": "/customer/notifications",
  "open settings": "/customer/settings",
  help: "/customer/support",
};

const VoiceCommandNavigation = () => {
  const { t } = useTranslation();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const navigate = useNavigate();

  const SpeechRecognition =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    if (!listening || !SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript.toLowerCase();
      setTranscript(speech);
      handleCommand(speech);
    };

    recognition.onerror = (err) => {
      setListening(false);
      toast.error(t("voice_error", { defaultValue: "Voice error occurred" }));
      console.error("Voice error:", err);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();

    return () => {
      recognition.abort();
    };
    // eslint-disable-next-line
  }, [listening]);

  const handleCommand = (text) => {
    for (let command in commandsMap) {
      if (text.includes(command)) {
        navigate(commandsMap[command]);
        speak(
          t("voice_navigate_success", {
            defaultValue: `Navigating to ${command}`,
            command,
          })
        );
        toast.success(
          t("voice_navigate_success", {
            defaultValue: `Navigating to ${command}`,
            command,
          })
        );
        return;
      }
    }
    speak(
      t("voice_not_understood", { defaultValue: "Sorry, I didn't understand that." })
    );
    toast.error(t("voice_not_understood", { defaultValue: "Sorry, I didn't understand that." }));
  };

  const speak = (message) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const synth = window.speechSynthesis;
      const utter = new window.SpeechSynthesisUtterance(message);
      synth.speak(utter);
    }
  };

  const handleMicClick = () => {
    if (!SpeechRecognition) {
      toast.error(
        t("voice_not_supported", { defaultValue: "Voice recognition not supported in this browser." })
      );
      return;
    }
    setListening((prev) => !prev);
    setTranscript("");
  };

  return (
    <>
      <FixivaHelmet
        title={t("voice_command_nav_title", { defaultValue: "Voice Command Navigation" })}
        description={t("voice_command_nav_desc", { defaultValue: "Navigate the app using your voice" })}
        name="VoiceCommandNavigation"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col items-center p-4 rounded-lg bg-[var(--color-bg)] shadow max-w-sm mx-auto"
        aria-label={t("voice_command_nav_aria", { defaultValue: "Voice Command Navigation" })}
      >
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaVolumeUp className="text-[var(--color-primary)]" />
          {t("voice_command_nav", { defaultValue: "Voice Command Navigation" })}
        </h3>
        <p className="text-sm mb-4 text-[var(--color-text)]">
          {t("voice_command_hint", { defaultValue: "Tap the mic and speak a command like 'go to dashboard'." })}
        </p>
        <button
          aria-label={listening
            ? t("stop_listening", { defaultValue: "Stop Listening" })
            : t("start_listening", { defaultValue: "Start Listening" })}
          onClick={handleMicClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white 
            transition ${listening ? "bg-red-500 animate-pulse" : "bg-[--color-primary]"} hover:bg-[--color-hover]`}
        >
          {listening ? <FaStop /> : <FaMicrophone />}
          {listening
            ? t("stop_listening", { defaultValue: "Stop Listening" })
            : t("start_listening", { defaultValue: "Start Listening" })}
        </button>
        {transcript && (
          <div className="mt-4 w-full text-xs bg-[--color-bg-dark] text-[--color-text-light] px-3 py-1 rounded shadow">
            🗣 {transcript}
          </div>
        )}
        <ul className="mt-4 text-xs text-left w-full text-[var(--color-text)] list-disc pl-5">
          <li>{t("vcmd_example_dashboard", { defaultValue: "Say: go to dashboard" })}</li>
          <li>{t("vcmd_example_wallet", { defaultValue: "Say: open wallet" })}</li>
          <li>{t("vcmd_example_profile", { defaultValue: "Say: profile" })}</li>
        </ul>
      </motion.div>
    </>
  );
};export default VoiceCommandNavigation;