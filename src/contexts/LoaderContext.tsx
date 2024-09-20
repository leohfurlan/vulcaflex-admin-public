import React, { createContext, useState, useContext } from 'react'

interface LoaderContextProps {
  showLoader: () => void
  hideLoader: () => void
  isLoading: boolean
}

const LoaderContext = createContext<LoaderContextProps>(
  {} as LoaderContextProps,
)

interface LoaderProviderProps {
  children: React.ReactNode
}

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const showLoader = () => setIsLoading(true)
  const hideLoader = () => setIsLoading(false)

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }
  return context
}
