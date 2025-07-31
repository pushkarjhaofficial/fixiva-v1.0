import { useContext } from "react"
import { AuthContext, type UseAuthReturn } from "@/context/AuthContext"

const useAuth = (): UseAuthReturn => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>")
  return ctx
}

export default useAuth