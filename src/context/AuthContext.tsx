import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode
} from "react"
import { toast } from "react-hot-toast"
import { getTokenFromStorage, saveToken, removeToken } from "@/utils/token"
import { getCurrentUser } from "@/services/auth"

// === ALL Fixiva Roles, Complete ===
export const FIXIVA_ROLES = [
  "customer",
  "corp_admin",
  "corp_employee",
  "govt_officer",
  "govt_contractor",
  "govt_employee",
  "vendor",
  "vendor_partner",
  "recycle_agent",
  "admin",
  "client_partner",
  "support_agent",
  "auditor",
  "franchise_owner"
] as const

export type FixivaRole = (typeof FIXIVA_ROLES)[number]

export interface UseAuthReturn {
  user: any
  role: FixivaRole | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean
  login: (token: string, userInfo: any) => void
  logout: () => void
  hasRole: (roles: FixivaRole[]) => boolean
  // Individual role helpers (ALL BELOW)
  isAdmin: boolean
  isVendor: boolean
  isVendorPartner: boolean
  isCustomer: boolean
  isGovt: boolean
  isGovtOfficer: boolean
  isGovtEmployee: boolean
  isGovtContractor: boolean
  isCorpAdmin: boolean
  isCorpEmployee: boolean
  isRecycleAgent: boolean
  isPartner: boolean
  isSupportAgent: boolean
  isAuditor: boolean
  isFranchise: boolean
}

export const AuthContext = createContext<UseAuthReturn | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<FixivaRole | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const storedToken = getTokenFromStorage()
      if (!storedToken) return setLoading(false)
      setToken(storedToken)
      try {
        const res = await getCurrentUser(storedToken)
        setUser(res.user)
        setRole(res.user.role)
      } catch (err) {
        console.error("AuthContext: failed to fetch user:", err)
        removeToken()
        setUser(null)
        setRole(null)
      } finally {
        setLoading(false)
      }
    }
    if (typeof window !== "undefined") init()
  }, [])

  const login = useCallback((newToken: string, userInfo: any) => {
    saveToken(newToken)
    setToken(newToken)
    setUser(userInfo)
    setRole(userInfo?.role)
    toast.success("Logged in successfully.")
  }, [])

  const logout = useCallback(() => {
    removeToken()
    setToken(null)
    setUser(null)
    setRole(null)
    toast("Logged out.")
  }, [])

  const hasRole = useCallback(
    (roles: FixivaRole[]) => (role ? roles.includes(role) : false),
    [role]
  )
  const isRole = (target: FixivaRole) => role === target

  // Multi-segment helpers
  const isGovt =
    role === "govt_officer" || role === "govt_employee" || role === "govt_contractor"

  const value: UseAuthReturn = {
    user,
    role,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
    // INDIVIDUAL ROLE CHECKS (ALL ROLES)
    isAdmin: isRole("admin"),
    isVendor: isRole("vendor"),
    isVendorPartner: isRole("vendor_partner"),
    isCustomer: isRole("customer"),
    isGovt,
    isGovtOfficer: isRole("govt_officer"),
    isGovtEmployee: isRole("govt_employee"),
    isGovtContractor: isRole("govt_contractor"),
    isCorpAdmin: isRole("corp_admin"),
    isCorpEmployee: isRole("corp_employee"),
    isRecycleAgent: isRole("recycle_agent"),
    isPartner: isRole("client_partner"),
    isSupportAgent: isRole("support_agent"),
    isAuditor: isRole("auditor"),
    isFranchise: isRole("franchise_owner")
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): UseAuthReturn => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>")
  return ctx
}
