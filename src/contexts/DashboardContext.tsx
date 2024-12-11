import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface DashboardContextProviderProps {
  children: React.ReactNode
}

interface UnitySpecifications {
  qnt_placas: number
  qnt_processos: number
  qnt_tambores: number
  qnt_transportadores: number
}

interface DashboardContextProps {
  unitySpecifications: UnitySpecifications
  setUnitySpecifications: Dispatch<SetStateAction<UnitySpecifications>>
}

const DashboardContext = createContext({} as DashboardContextProps)

export function DashboardProvider({ children }: DashboardContextProviderProps) {
  const [unitySpecifications, setUnitySpecifications] =
    useState<UnitySpecifications>({
      qnt_placas: 0,
      qnt_processos: 0,
      qnt_tambores: 0,
      qnt_transportadores: 0,
    })

  return (
    <DashboardContext.Provider
      value={{ unitySpecifications, setUnitySpecifications }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboardContext() {
  const ctx = useContext(DashboardContext)
  if (!ctx) {
    throw new Error(
      'useDashboardContext must be used within a DashboardContextProvider',
    )
  }
  return ctx
}
