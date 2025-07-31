import { useState, useEffect, useRef, useCallback } from "react"

export interface UseVoiceOptions {
  continuous?: boolean
  interimResults?: boolean
  lang?: string
}

export interface UseVoiceReturn {
  listening: boolean
  transcript: string
  error: string | null
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
}

/**
 * useVoice
 * Provides voice recognition using browser SpeechRecognition/WebkitSpeechRecognition.
 * @param options - { continuous, interimResults, lang }
 * @returns { listening, transcript, error, startListening, stopListening, resetTranscript }
 */
export const useVoice = (
  options: UseVoiceOptions = {}
): UseVoiceReturn => {
  const {
    continuous = false,
    interimResults = false,
    lang = "en-US"
  } = options

  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)
  // Using any here is the only way to avoid TS errors due to vendor prefixes
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognitionClass) {
      setError("Speech Recognition API not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognitionClass()
    recognition.continuous = continuous
    recognition.interimResults = interimResults
    recognition.lang = lang

    recognition.onstart = () => {
      setListening(true)
      setError(null)
    }
    recognition.onend = () => {
      setListening(false)
    }
    recognition.onerror = (event: any) => {
      setError(event.error)
      setListening(false)
    }
    recognition.onresult = (event: any) => {
      let finalTranscript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript
      }
      setTranscript(finalTranscript)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
      recognitionRef.current = null
    }
  }, [continuous, interimResults, lang])

  const startListening = useCallback(() => {
    if (recognitionRef.current && !listening) {
      try {
        setTranscript("")
        recognitionRef.current.start()
      } catch (e: any) {
        setError(e.message)
      }
    }
  }, [listening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop()
    }
  }, [listening])

  const resetTranscript = useCallback(() => {
    setTranscript("")
  }, [])

  return {
    listening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript
  }
}

export default useVoice
