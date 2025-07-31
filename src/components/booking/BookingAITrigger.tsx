// src/components/booking/BookingAITrigger.tsx

import React, { useState, useRef, useEffect } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import Modal from "@/components/shared/Modal"
import { useFixivaBot } from "@/hooks/useFixivaBot"        // returns { messages, loading, sendUserMessage, ... }
import { useNotification } from "@/hooks/useNotification"
import { useTranslation } from "react-i18next"
import { FaRobot, FaMicrophone, FaPaperPlane } from "react-icons/fa"

// Temporary TS types for SpeechRecognition
type SpeechRecognition = any
type SpeechRecognitionEvent = any

export interface BookingAITriggerProps {
  bookingId: string
  className?: string
}

export const BookingAITrigger: React.FC<BookingAITriggerProps> = ({
  bookingId,
  className,
}) => {
  const { t } = useTranslation()
  const { notifyError } = useNotification()

  // ▶ Destructure the actual hook return:
  const {
    messages: botMessages,
    loading: aiLoading,
    sendUserMessage
  } = useFixivaBot()

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Speech recognition
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) return
    const recog: SpeechRecognition = new SR()
    recog.lang = t("common.langCode") || "en-US"
    recog.interimResults = false
    recog.maxAlternatives = 1
    recog.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript
      setInput((prev) => prev + transcript)
    }
    recog.onend = () => setListening(false)
    recognitionRef.current = recog
  }, [t])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    // ▶ Use the hook's sendUserMessage
    sendUserMessage(text)
    setInput("")
  }

  const toggleListening = () => {
    const recog = recognitionRef.current
    if (!recog) {
      notifyError(t("booking.voiceNotSupported"))
      return
    }
    if (listening) {
      recog.stop()
      setListening(false)
    } else {
      recog.start()
      setListening(true)
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-[--color-primary] text-white focus:outline-none",
          className
        )}
        aria-label={t("booking.askAI")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaRobot size={24} />
      </motion.button>

      <Modal show={open} onClose={() => setOpen(false)} title={t("booking.askAI")} size="md">
        <div className="flex flex-col h-96">
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {botMessages.map((msg, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-2 rounded-lg max-w-[80%]",
                  msg.fromBot
                    ? "self-start bg-gray-100 text-gray-800"
                    : "self-end bg-[--color-primary]/10 text-[--color-primary]"
                )}
              >
                {msg.text}
              </div>
            ))}
            {aiLoading && (
              <div className="self-start text-gray-500 italic">
                {t("booking.aiThinking")}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              disabled={aiLoading}
              className={clsx(
                "p-2 rounded-full focus:outline-none",
                listening ? "bg-red-200 text-red-600" : "bg-gray-200 text-gray-600"
              )}
              aria-label={t("booking.voiceInput")}
            >
              <FaMicrophone />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={aiLoading}
              placeholder={t("booking.aiPlaceholder")}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:border-[--color-primary] bg-[--color-bg] border-[--color-border]"
            />
            <button
              onClick={handleSend}
              disabled={aiLoading || !input.trim()}
              className={clsx(
                "p-2 rounded-full focus:outline-none",
                aiLoading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[--color-primary] text-white"
              )}
              aria-label={t("booking.sendMessage")}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default BookingAITrigger
