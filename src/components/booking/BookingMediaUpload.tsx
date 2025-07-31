import React, { useRef, useCallback, useState, useEffect } from "react"
import clsx from "clsx"
import { useNotification } from "@/hooks/useNotification"

export interface BookingMediaUploadProps {
  /** Current files */
  attachments: File[]
  /** Called when files change (add/remove) */
  onChange: (files: File[]) => void
  /** Maximum number of files allowed */
  maxFiles?: number
  /** Comma-separated accept string (e.g. "image/*,video/*,audio/*") */
  accept?: string
  /** Maximum file size in MB */
  maxSizeMB?: number
  /** Optional OCR handler: called with text when OCR completes */
  onOcrResult?: (text: string) => void
  /** Disable uploading */
  disabled?: boolean
  /** Additional class */
  className?: string
}

export const BookingMediaUpload: React.FC<BookingMediaUploadProps> = ({
  attachments,
  onChange,
  maxFiles = 5,
  accept = "image/*,video/*,audio/*",
  maxSizeMB = 10,
  onOcrResult,
  disabled = false,
  className
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { notifyError, notifySuccess } = useNotification()
  const [previews, setPreviews] = useState<string[]>([])

  // Generate previews whenever attachments change
  useEffect(() => {
    const urls = attachments.map((file) => URL.createObjectURL(file))
    setPreviews(urls)
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [attachments])

  // Validate and add files
  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return
      const incoming = Array.from(files)
      if (attachments.length + incoming.length > maxFiles) {
        notifyError(`You can upload up to ${maxFiles} files.`)
        return
      }
      const valid: File[] = []
      for (const file of incoming) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          notifyError(`${file.name} exceeds ${maxSizeMB}MB.`)
          continue
        }
        valid.push(file)
      }
      if (valid.length) {
        onChange([...attachments, ...valid])
        notifySuccess(`${valid.length} file(s) added.`)
        // Optionally perform OCR on images
        if (onOcrResult) {
          valid.forEach((file) => {
            if (file.type.startsWith("image/")) {
              // Defer OCR integration to user code
              // Example: upload to OCR service then call onOcrResult(text)
              // onOcrResult("...recognized text...")
            }
          })
        }
      }
    },
    [attachments, maxFiles, maxSizeMB, notifyError, notifySuccess, onChange, onOcrResult]
  )

  const removeAt = useCallback(
    (index: number) => {
      const updated = attachments.filter((_, i) => i !== index)
      onChange(updated)
      notifySuccess("File removed.")
    },
    [attachments, onChange, notifySuccess]
  )

  return (
    <div className={clsx("space-y-2", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
        className={clsx(
          "px-4 py-2 rounded-md font-semibold shadow focus:outline-none transition",
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"
            : "bg-[--color-primary] text-white hover:bg-[--color-primary]/90"
        )}
      >
        Upload Media ({attachments.length}/{maxFiles})
      </button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ""
        }}
      />

      <div className="grid grid-cols-3 gap-2">
        {previews.map((url, idx) => {
          const file = attachments[idx]
          const isImage = file.type.startsWith("image/")
          const isVideo = file.type.startsWith("video/")
          const isAudio = file.type.startsWith("audio/")
          return (
            <div key={idx} className="relative group">
              {isImage && (
                <img
                  src={url}
                  alt={file.name}
                  className="w-full h-24 object-cover rounded"
                />
              )}
              {isVideo && (
                <video
                  src={url}
                  className="w-full h-24 object-cover rounded"
                  controls
                />
              )}
              {isAudio && (
                <audio src={url} className="w-full" controls />
              )}
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeAt(idx)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookingMediaUpload
