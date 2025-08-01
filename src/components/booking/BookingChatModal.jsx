import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { BookingVoiceInput } from "@components";
import { QRScanner } from "@components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import { FaTimes, FaPaperPlane, FaImage } from "react-icons/fa";

const BookingChatModal = ({ bookingId, onClose, user }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    fetch(`/api/bookings/${bookingId}/chat`)
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => toast.error("Failed to load chat"));

    // socket connection for live messages (pseudo)
    // socket.emit("joinBookingChat", bookingId);
    // socket.on("bookingMessage", (msg) => {
    //   if (msg.booking_id === bookingId) {
    //     setMessages((prev) => [...prev, msg]);
    //     scrollToBottom();
    //   }
    // });

    return () => {
      // socket.off("bookingMessage");
    };
    // eslint-disable-next-line
  }, [bookingId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    // replace with your API or socket send logic
    setMessages((prev) => [
      ...prev,
      {
        sender: user.role,
        message: input,
        image: image ? URL.createObjectURL(image) : null,
        created_at: new Date().toISOString(),
      },
    ]);
    setInput("");
    setImage(null);
    setTimeout(() => {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full max-w-xl rounded-lg bg-[--color-bg] p-0 shadow-lg flex flex-col h-[70vh]"
      >
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="font-bold">{t("booking_chat", { defaultValue: "Booking Chat" })}</h2>
          <button aria-label={t("close", { defaultValue: "Close" })} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === user.role ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg shadow ${
                  msg.sender === user.role
                    ? "bg-[--color-primary] text-[--color-text-light]"
                    : "bg-[var(--color-bg-muted)] dark:bg-zinc-800 text-[--color-text] dark:text-[--color-text-light]"
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="mb-2 rounded-md max-h-40 object-cover"
                  />
                )}
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={chatRef} />
        </div>
        <div className="border-t dark:border-zinc-700 p-4 flex gap-2 items-center">
          <label className="cursor-pointer text-[var(--color-text)] hover:text-[var(--color-text)]">
            <FaImage />
            <input
              aria-label="Attach image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
          </label>
          <input
            aria-label="Type message"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-2 border rounded-lg bg-[var(--color-bg)] dark:bg-zinc-800"
            placeholder={t("type_message", { defaultValue: "Type a message..." })}
          />
          <button
            aria-label="Send"
            onClick={sendMessage}
            className="bg-[--color-primary] text-[--color-text-light] p-2 rounded-lg hover:bg-[--color-hover] transition"
          >
            <FaPaperPlane />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export { BookingChatModal };
export default BookingChatModal;
