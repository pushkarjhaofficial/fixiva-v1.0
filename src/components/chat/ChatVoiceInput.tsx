// src/components/chat/ChatVoiceInput.tsx

import React from "react"

interface Props {
  onTranscript: (text: string) => void
}

const ChatVoiceInput: React.FC<Props> = ({ onTranscript }) => {
  const startListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SpeechRecognition) return alert("Speech recognition not supported.")

    const recognition = new SpeechRecognition()
    recognition.lang = "en-IN"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript
      onTranscript(transcript)
    }

    recognition.start()
  }

  return (
    <button
      type="button"
      onClick={startListening}
      title="Voice Input"
      className="text-neutral-600 dark:text-neutral-300"
    >
      🎤
    </button>
  )
}

export default ChatVoiceInput
