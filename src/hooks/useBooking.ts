import { useState, useEffect, useCallback } from "react"
import { useRetry } from "./useRetry"
import { getAvailableSlots, createBooking } from "@/services/booking"
import { useAuth } from "@/context/AuthContext"
import { useSocket } from "@/context/SocketContext"
import { useNotification } from "@/context/NotificationContext"
import { useFixivaBot } from "@/context/FixivaBotContext"

export interface BookingFormData {
  serviceCategory: string
  date: string
  timeSlot: string
  address: string
  description?: string
  attachments?: File[]
}

// ✅ Explicit response type for slot API
interface AvailableSlotsResponse {
  slots: string[]
  // extend here if your backend sends more fields
}

export const useBooking = (initialData?: Partial<BookingFormData>) => {
  const [form, setForm] = useState<BookingFormData>({
    serviceCategory: "",
    date: "",
    timeSlot: "",
    address: "",
    description: "",
    attachments: [],
    ...initialData
  })
  const [step, setStep] = useState<number>(1)
  const [slots, setSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const retry = useRetry()
  const { token } = useAuth()
  const { emitEvent } = useSocket()
  const { notifyError, notifySuccess } = useNotification()
  const { startChat, sendUserMessage } = useFixivaBot()

  const fetchSlots = useCallback(async () => {
    if (!form.serviceCategory || !form.date) {
      setSlots([])
      return
    }
    setLoadingSlots(true)
    try {
      const data = await retry(
        () => getAvailableSlots(form.serviceCategory, form.date),
        3,
        1000
      ) as AvailableSlotsResponse // 👈 FIXED: Type assertion here
      setSlots(data.slots)
    } catch (error: any) {
      notifyError("Failed to fetch slots. Please try again.")
      setSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }, [form.serviceCategory, form.date, retry, notifyError])

  useEffect(() => {
    fetchSlots()
  }, [fetchSlots])

  const updateField = useCallback(
    <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, 4))
  }, [])

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1))
  }, [])

  const submitBooking = useCallback(async () => {
    setSubmitting(true)
    try {
      const res = await createBooking(form, token)
      notifySuccess("Booking created successfully.")
      emitEvent("booking:new", res.booking)
      setStep(4)
      return res.booking
    } catch (error: any) {
      notifyError(error?.message || "Booking failed.")
      return null
    } finally {
      setSubmitting(false)
    }
  }, [form, token, emitEvent, notifySuccess, notifyError])

  const askAI = useCallback(
    (text: string) => {
      startChat()
      sendUserMessage(text)
    },
    [startChat, sendUserMessage]
  )

  return {
    form,
    step,
    slots,
    loadingSlots,
    submitting,
    updateField,
    nextStep,
    prevStep,
    fetchSlots,
    submitBooking,
    askAI
  }
}

export default useBooking
