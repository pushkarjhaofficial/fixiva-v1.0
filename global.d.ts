// --- Fix for TypeScript: browser SpeechRecognition types ---
type _SpeechRecognition = typeof window extends { webkitSpeechRecognition: infer T }
  ? T
  : never

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

type SpeechRecognitionType = InstanceType<typeof window.webkitSpeechRecognition>
