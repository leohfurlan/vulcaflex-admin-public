import { createContext, useContext, useState } from 'react'

const STR = 'teste'

type HandleLoginResponse = { success: boolean; message: string }

interface AuthContextProps {
  isAuthenticated: boolean
  handleLogin: (username: string, password: string) => HandleLoginResponse
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function handleLogin(
    username: string,
    password: string,
  ): HandleLoginResponse {
    if (username !== STR || password !== STR) {
      return { success: false, message: 'Usuário ou senha incorretos!' }
    }

    setIsAuthenticated(true)
    return { success: true, message: 'OK!' }
  }

  return (
    <AuthContext.Provider value={{ handleLogin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return ctx
}
