import React from "react"

export interface QrModalProps {
  show: boolean
  onClose: () => void
  qrValue: string // URL or any QR data
  title?: string
  description?: string
}

export const QrModal: React.FC<QrModalProps> = ({
  show,
  onClose,
  qrValue,
  title = "Scan this QR",
  description
}) => {
  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="bg-[--color-bg] rounded-xl shadow-2xl p-8 flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-4 text-xl font-bold text-[--color-primary]">{title}</div>
        <div className="mb-2">
          {/* Use any QR generator lib; placeholder for real QR */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrValue)}`}
            alt="QR code"
            className="rounded bg-white p-2 border border-[--color-border]"
          />
        </div>
        {description && (
          <div className="mb-4 text-sm opacity-80 text-center">{description}</div>
        )}
        <button
          onClick={onClose}
          className="mt-2 px-5 py-1.5 rounded bg-[--color-primary] text-white font-semibold hover:bg-opacity-90 transition"
          aria-label="Close"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default QrModal
